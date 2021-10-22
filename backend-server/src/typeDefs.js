const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  type Query {
    listCurrentUser: User!
    listUsers: [User!]!
    chatRooms: [ChatRoom!]!
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthUser!
    signIn(input: SignInInput!): AuthUser!

    updateUser(input: UpdateUserInput!): User!
    createChatRoom(name: String!, imageUri: String): ChatRoom!
  }

  input SignUpInput{
    email: String!
    password: String!
    name: String!
    phoneno: String!
    avatar: String
    status: String
  }

  input SignInInput{
    email: String!
    password: String!
  }

  input UpdateUserInput{
    id: ID!
    name: String!
    avatar: String
    status: String
  }

  type AuthUser {
    user: User!
    token: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }
  
  type User {
    id: ID!
    name: String!
    phoneno: String!
    email: String!
    avatar: String
    status: String

    contacts: [User!]!
    chatRooms: [ChatRoom!]!
  }

  type ChatRoom {
    id: ID!
    createdAt: String!
    name: String!
    imageUri: String

    users: [User!]!
    messages: [Message!]!
    lastMessage: Message!
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!

    user: User!
    chatRoom: ChatRoom!
  }
`;

module.exports = typeDefs;