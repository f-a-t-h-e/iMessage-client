import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import ConversationOperations from "@/graphql/operations/conversation";
import ConversationList from "./ConversationList";
import { IConversationsData } from "@/utils/types";

type IConversationWrapperProps = {
  session: Session;
};

const ConversationWrapper = ({ session }: IConversationWrapperProps) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<IConversationsData>(
    ConversationOperations.Queries.conversations
  );

  const subscribrToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: {
              conversationCreated: IConversationsData["conversations"][number];
            };
          };
        }
      ) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  /**
   * Excute subscription on mount
   */
  useEffect(() => {
    subscribrToNewConversations();
  }, []);
  return (
    <Box w={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py="6" px="3">
      {/* Skelton Loader */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationWrapper;
