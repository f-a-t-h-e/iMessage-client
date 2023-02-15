import { useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import ConversationOperations from "@/graphql/operations/conversation";
import ConversationList from "./ConversationList";
import { IConversationsData } from "@/utils/types";
import { useRouter } from "next/router";
import SkeletonLoader from "../../Common/SkeletonLoader";

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
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;
  const onViewConv = async (conversationId: string) => {
    /**
     * 1. Push the conv id to the router
     */
    router.push({ query: { conversationId } });
    /**
     * 2. Mark the conv as read
     */
  };

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(conversationsLoading);

  return (
    <Box
      w={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py="6"
      px="3"
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
    >
      {conversationsLoading ? (
        <Flex direction="column" w="100%" h="100%" gap="10px">
          <SkeletonLoader count={5} width="100%" height="80px" />
        </Flex>
      ) : (
        <ConversationList
          session={session}
          conversations={conversationsData?.conversations || []}
          onViewConv={onViewConv}
        />
      )}
    </Box>
  );
};

export default ConversationWrapper;
