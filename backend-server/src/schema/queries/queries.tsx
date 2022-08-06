import { gql } from "@apollo/client";

// Query Authenticated User
export const QUERY_CURRENT_USER = gql`
  query listCurrentUser {
    listCurrentUser {
      id
      name
      status
      avatar
      phoneno
    }
  }
`;

// Query User ChatRooms
export const QUERY_USER_CHATROOMS = gql`
  query listChatRooms {
    chatRooms {
      id
      name
      createdAt
      imageUri
      users {
        id
        name
        phoneno
      }
      lastMessage {
        id
        createdAt
        content
        user {
          id
          name
        }
      }
    }
  }
`;

// Query User Contacts
export const QUERY_USER_CONTACTS = gql`
  query listUsers {
    listUsers {
      id
      name
      email
      phoneno
      avatar
      status
    }
  }
`;

// Ouery Messages by ChatRoom
export const QUERY_MESSAGE_BY_CHATROOM = gql`
  query messagesByChatRooms($chatRoomId: ID!) {
    messagesByChatRooms(chatRoomId: $chatRoomId) {
      id
      createdAt
      content
      user {
        id
        name
      }
      chatRoom {
        id
        name
      }
    }
  }
`;
