import { gql } from "@apollo/client";

// Sign Up Mutation
export const SIGN_UP_MUTATION = gql`
mutation signUp($email: String!,$password: String!, $name: String!, $phoneno: String!){
  signUp(input:{
    email: $email,
    password: $password,
    name: $name,
    phoneno: $phoneno,
  }){
    token,
    user {
      id
      name
      email
      phoneno
    }
  }
}
`;

// Sign In Mutation
export const SIGN_IN_MUTATION = gql`
mutation signIn($email: String!,$password: String!){
  signIn(input: {
    email: $email,
    password: $password
  }) {
    token
    user {
      name
      phoneno
      email
    }
  }
}
`;

// Update User Mutation
export const UPDATE_USER_MUTATION = gql`
mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput) {
      name
      avatar
      status
      id
    }
}
`;

// Create ChatRoom Mutation
export const CREATE_CHATROOM_MUTATION = gql`
mutation createChatRoom($createChatRoomName: String!, $createChatRoomImageUri: String) {
  createChatRoom(name: $createChatRoomName, imageUri: $createChatRoomImageUri) {
    id
    name
    imageUri
    createdAt
    users {
      id
      name
    }
  }
}
`;

// Update ChatRoom Mutation
export const UPDATE_CHATROOM_MUTATION = gql`
mutation updateChatRoom($chatRoomId: ID!, $lastMessageId: ID!) {
  updateChatRoom(chatRoomId: $chatRoomId, lastMessageId: $lastMessageId) {
    id
    lastMessageId
    name
    users {
      name
    }
    lastMessage {
      user {
        id
        name
      }
    }
  }
}
`;

// Add User To ChatRoom Mutation
export const ADD_USER_TO_CHATROOM_MUTATION = gql`
mutation addUser($chatRoomId: ID!, $userId: ID!) {
  addUserToChatRoom(ChatRoomID: $chatRoomId, userID: $userId) {
    name
    users {
      name
      id
    }
  }
}
`;

// Create Message Mutation
export const CREATE_MESSAGE_MUTATION = gql`
mutation CreateMessageMutation($content: String!, $userId: ID!, $chatRoomId: ID!) {
    createMessage(content: $content, userId: $userId, chatRoomId: $chatRoomId) {
      id
      content
    }
}
`;