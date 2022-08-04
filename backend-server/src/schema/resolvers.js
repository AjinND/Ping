const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

dotenv.config();
const {DB_URI, DB_NAME, JWT_SECRET} = process.env;

const getToken = (user) => {
  return jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '7 days'});
}
const NEW_MESSAGE = 'NEW_MESSAGE';

const resolvers = {

  Subscription: {
    onCreateMessage: {
      subscribe: () => {
        return pubsub.asyncIterator([NEW_MESSAGE]);
      }
    }
  },

  Query: {
    listCurrentUser: async (_, __, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }
      return await db.collection('Users').findOne(user);
    },
    listUsers: async (_, __, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      //returns all the users in the DB
      return await db.collection('Users').find().toArray();
    },
    chatRooms: async (_, __, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      return await db.collection('ChatRoom').find({userIds: user._id}).toArray();
    },
    messagesByChatRooms: async(_, args, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      const messagesData = await db.collection('Messages').find({chatRoomId: ObjectId(args.chatRoomId)}).toArray(); 
      messagesData.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      //console.log(messagesData);
      return messagesData; 
    }
  },

  Mutation: {

    signUp: async (_, {input}, {db} )=> {
      const hashedPassword = bcrypt.hashSync(input.password);
      
      const newUser = {
        //email: input.email,
        //name: input.name,
        ...input,
        password: hashedPassword,
      }
      //save to db
      const result = await db.collection('Users').insertOne(newUser);
      const user = await db.collection('Users').findOne(result.insertedId);
      return {
        user,
        token: getToken(user),
      }
    },

    signIn: async (_, {input}, {db})=> {
      const user = await db.collection('Users').findOne({email: input.email});
      const isPassword = await user && bcrypt.compareSync(input.password, user.password);
      if(!user || !isPassword){
        throw new Error("Invalid Credentials!");
      }

      return {
        user,
        token: getToken(user),
      }
    },


    updateUser: async (_, {input}, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      const result = await db.collection('Users')
                              .updateOne({
                                _id: ObjectId(input.id)
                              }, {
                                // $set used for updating the some specific fields.
                                // otherwise it replace the whole object.
                                $set: {
                                  name: input.name,
                                  status: input.status,
                                  avatar: input.avatar
                                }
                              });
      //console.log(result);
      return await db.collection('Users').findOne({_id: ObjectId(input.id)});
    },

    createChatRoom: async (_, {name, imageUri, phoneno}, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      // Check if the chatroom is already present (using the name of the user)
      try{
        const chatRoom = await db.collection('ChatRoom').findOne({name});
        if(chatRoom){
          const users = await db.collection('Users').findOne({_id: ObjectId(chatRoom.userIds[1])});
          //console.log(users);

          //check if the user is already present in chatRoom
          if(users.phoneno.toString() === phoneno.toString()){
            //console.log("Already present user!");
            return chatRoom;
          }
        }
        
      }catch(e){
        console.log(e);
      }

      const newChatRoom = {
        name,
        createdAt: new Date().toISOString(),
        imageUri,
        userIds: [user._id]
      }

      const result = await db.collection('ChatRoom').insertOne(newChatRoom);
      //console.log(result.insertedId);
      return await db.collection('ChatRoom').findOne(result.insertedId);
    },

    updateChatRoom: async (_, input, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      //console.log(input);
      const result = await db.collection('ChatRoom')
                              .updateOne({
                                _id: ObjectId(input.chatRoomId)
                              }, {
                                // $set used for updating the some specific fields.
                                // otherwise it replace the whole object.
                                $set: {
                                  lastMessageId: ObjectId(input.lastMessageId),
                                  updatedAt: new Date().toISOString(),
                                }
                              });
      //console.log(result);
      return await db.collection('ChatRoom').findOne({_id: ObjectId(input.chatRoomId)});
    },

    addUserToChatRoom: async (_, {ChatRoomID, userID}, {db, user})=> {
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      const chatRoom = await db.collection('ChatRoom').findOne({_id: ObjectId(ChatRoomID)});
      if(!chatRoom){ return null; }

      //check if the user is already present in chatRoom
      if(chatRoom.userIds.find((dbId)=> dbId.toString() === userID.toString())){
        return chatRoom;
      }
      //update in the database
      await db.collection('ChatRoom')
                .updateOne({
                    _id: ObjectId(ChatRoomID)
                  }, {
                    // $set used for updating the some specific fields.
                    // otherwise it replace the whole object.
                    $push: {
                    userIds: ObjectId(userID),
                  }
                });
      //update in the chatRoom
      chatRoom.userIds.push(ObjectId(userID));
      return chatRoom;
    },
    
    createMessage: async (_, {content, userId, chatRoomId}, context)=> {
      const {db, user} = context;
      //console.log(context);
      if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

      const newMessage = {
        content,
        createdAt: new Date().toISOString(),
        userId: ObjectId(userId),
        chatRoomId: ObjectId(chatRoomId)
      }
      const result = await db.collection('Messages').insertOne(newMessage);

      const newMessageData = await db.collection('Messages').findOne(result.insertedId);
      // console.log(newMessageData);
      await pubsub.publish(NEW_MESSAGE, {
        onCreateMessage: await newMessageData,
      });

      return newMessageData;
    },

  },

  User: {
    id: (root) => root._id  || root.id,

    // List the chatrooms of the User
    chatRooms: async ({_id}, _, {db}) => (
      await db.collection('ChatRoom').find({userIds: ObjectId(_id)}).toArray()
    ),

    // List the messages of the User
    messages: async({_id}, _, {db}) => 
      await db.collection('Messages').find({userId: ObjectId(_id)}).toArray()
  },

  ChatRoom: {
    id: (root) => root._id  || root.id,

    // List the users of the Chatroom
    users: async (parent, _, {db}) => (
      {_id, _, _, _, userIds} = parent,
      //console.log(parent),
      Promise.all(
        userIds.map(userId =>
          db.collection('Users').findOne({_id: userId})
        )
      )
    ),
    
    // List the messages of the Chatroom
    messages: async({_id}, _, {db}) => (
      await db.collection('Messages').find({chatRoomId: ObjectId(_id)}).toArray()
    ),

    lastMessage: async(parent, _, {db}) => (
      await db.collection('Messages').findOne({_id: parent.lastMessageId})
    ),
  },

  Message: {
    id: (root) => root._id  || root.id,

    user: async({userId}, _, {db}) => (
      await db.collection('Users').findOne({_id: ObjectId(userId)})
    ),

    chatRoom: async({chatRoomId}, _, {db}) => (
      await db.collection('ChatRoom').findOne({_id: ObjectId(chatRoomId)})
    ),
  }
};

module.exports = {resolvers};