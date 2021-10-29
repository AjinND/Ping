const bcrypt = require('bcryptjs');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const getToken = (user) => {
    return jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '7 days'});
}

module.exports = {
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
    },

    Mutation: {

      signUp: async (_, {input}, {db} )=> {      //can use data in palce of {input} and use data.input in the place of input {input} => destructuring of 'data' field
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

      Upload: GraphQLUpload,
      createChatRoom: async (_, {name, imageUri}, {db, user})=> {
        if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

        const { createReadStream, filename, mimetype, encoding } = await imageUri;
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

    },

    User: {
      id: (root) => root._id  || root.id
    },

    ChatRoom: {
      id: (root) => root._id  || root.id,
      users: async ({userIds}, _, {db}) =>
        Promise.all(
          userIds.map(userId =>
            db.collection('Users').findOne({_id: userId})
          )
        )
    },
};