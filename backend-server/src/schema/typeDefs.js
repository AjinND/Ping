const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`

  type Subscription {
    onCreateMessage: Message!
  }

  type Query {
    listCurrentUser: User!
    listUsers: [User!]!
    chatRooms: [ChatRoom!]!
    messagesByChatRooms(chatRoomId: ID!): [Message!]
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthUser!
    signIn(input: SignInInput!): AuthUser!

    createChatRoom(name: String!, imageUri: String, phoneno: String): ChatRoom!
    createMessage(content: String!, userId: ID!, chatRoomId: ID!): Message!

    updateUser(input: UpdateUserInput!): User!
    updateChatRoom(chatRoomId: ID!, lastMessageId: ID!): ChatRoom!

    addUserToChatRoom(ChatRoomID: ID!, userID:ID!): ChatRoom
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
    encoding: String!
  }
  
  type User {
    id: ID!
    name: String!
    phoneno: String!
    email: String!
    avatar: String
    status: String

    contacts: [User!]
    chatRooms: [ChatRoom!]
    messages: [Message!]
  }

  type ChatRoom {
    id: ID!
    createdAt: String!
    updatedAt: String
    name: String!
    imageUri: String

    users: [User!]!
    messages: [Message!]
    lastMessageId: ID!
    lastMessage: Message
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!
    userId: ID!
    chatRoomId: ID!
    
    user: User!
    chatRoom: ChatRoom!
  }
`;

module.exports = {typeDefs};