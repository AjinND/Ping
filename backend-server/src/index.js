const { ApolloServer } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
// const resolvers = require('./resolvers');

dotenv.config();
const {DB_URI, DB_NAME, JWT_SECRET} = process.env;

const getToken = (user) => {
  return jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '7 days'});
}

const getUserFromHeader = async(token, db) => {
  if(!token) { return null; }

  const tokenData = jwt.verify(token, JWT_SECRET);
  if(!tokenData?.id){ return null; }
  return await db.collection('Users').findOne({ _id: ObjectId(tokenData.id) });

}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
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

      createChatRoom: async (_, {name, imageUri}, {db, user})=> {
        if(!user){ throw new Error('Authentication Failed. Please Sign in'); }

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

const start = async() =>{
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers, 
      context: async( {req} )=> {
        const user = await getUserFromHeader(req.headers.authorization, db);
        //console.log(user);
        return {
          db,
          user,
        }
      }, 
    });

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });

}

start();