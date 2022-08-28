import { gql } from "@apollo/client";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription onCreateMessage {
    onCreateMessage {
      id
      createdAt
      content
      userId
      chatRoomId
    }
  }
`;
