import { gql } from "@apollo/client";

export const MessageFiels = /* GraphQL */ `
    id
    sender {
      id
      username
      image
    }
    body
    createdAt
`;

const MessageOperations = {
  Queries: {
    messages: gql`
      query GetMessages($conversationId: String!) {
        messages(conversationId:$conversationId) {
          ${MessageFiels}
        }
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation OnSendMessage($conversationId: String!, $body: String!) {
        sendMessage(conversationId: $conversationId, body: $body)
      }
    `,
  },
  Subscriptions: {
    messageSent: gql`
      subscription OnMessageSent($conversationId: String!) {
        messageSent(conversationId: $conversationId) {
          ${MessageFiels}
        }
      }
    `,
  },
};

export default MessageOperations;
