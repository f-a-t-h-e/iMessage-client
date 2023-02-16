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
    markConvAsRead: gql`
      mutation OnMarkConvAsRead($conversationId: String!) {
        markConvAsRead(conversationId: $conversationId)
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
    conversationUpdated: gql`
        subscription ConversationUpdated {
          conversationUpdated {
            conversation {
              ${ConversationFields}
            }
          }
        }
    `,
  },
};

export default ConversationOperations;
