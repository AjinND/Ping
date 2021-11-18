const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {typeDefs} = require('./schema/typeDefs');
const {resolvers} = require('./schema/resolvers');

const express = require("express");
const { createServer } = require("http");
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

dotenv.config();
const {DB_URI, DB_NAME, JWT_SECRET} = process.env;

const getUserFromHeader = async(token, db) => {
  if(!token) { return null; }

  const tokenData = jwt.verify(token, JWT_SECRET);
  if(!tokenData?.id){ return null; }
  return await db.collection('Users').findOne({ _id: ObjectId(tokenData.id) });

}

const app = express();
const httpServer = createServer(app);

const pubsub = new PubSub();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const start = async() =>{
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);

  const server = new ApolloServer({
    schema,
    context: async( {req} )=> {
      const user = await getUserFromHeader(req.headers.authorization, db);
      //console.log(user);
      return {
        db,
        user,
        pubsub,
      }
    },
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
    path: server.graphqlPath,
  });

  await server.start();
  server.applyMiddleware({ app });
  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}
start();

// const start = async() =>{
//   const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();
//   const db = client.db(DB_NAME);

//   // The ApolloServer constructor requires two parameters: your schema
//   // definition and your set of resolvers.
//   const server = new ApolloServer({ 
//     typeDefs, 
//     resolvers,
//     context: async( {req} )=> {
//       const user = await getUserFromHeader(req.headers.authorization, db);
//       //console.log(user);
//       return {
//         db,
//         user,
//         pubsub,
//       }
//     },
//   });

//   // await server.start();
//   // server.applyMiddleware({ app, cors: true });

//   // const httpServer = http.createServer(app);
//   // server.installSubscriptionHandlers(httpServer);

//   // The `listen` method launches a web server.
//   server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });
// }

// start();