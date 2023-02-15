import { gql } from "@apollo/client";
import { MessageFiels } from "./message";

const ConversationFields = /* GraphQL */ `
          id
          participants {
            user {
              id
              username
              image
            }
            hasSeenLatestMessage
          }
          latestMessage {
            ${MessageFiels}
          }
          updatedAt
`;

const ConversationOperations = {
  Queries: {
    conversations: gql`
      query GetConversations {
        conversations {
        ${ConversationFields}
      }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String!]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          ${ConversationFields}
        }
      }
    `,
  },
};

export default ConversationOperations;
