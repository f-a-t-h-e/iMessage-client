import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import ConversationOperations from "@/graphql/operations/conversation";
import ConversationList from "./ConversationList";
import {
  IConversationsData,
  IConversationUpdatedSubPayload,
} from "@/utils/types";
import { useRouter } from "next/router";
import SkeletonLoader from "../../Common/SkeletonLoader";
import { toast } from "react-hot-toast";
import { IParticipantPopulated } from "../../../../../backend/src/utils/types";

type IConversationWrapperProps = {
  session: Session;
};

const ConversationWrapper = ({ session }: IConversationWrapperProps) => {
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<IConversationsData>(
    ConversationOperations.Queries.conversations,
    {
      onError: ({ message }) => {
        toast.error(message);
      },
      fetchPolicy: "cache-first",
    }
  );

  useEffect(() => {
    console.log("CHANGE", conversationsData?.conversations[1]);
  }, [conversationsData]);

  const [markAsRead, { data }] = useMutation<
    { markConvAsRead: boolean },
    { conversationId: string }
  >(ConversationOperations.Mutations.markConvAsRead);

  useSubscription<IConversationUpdatedSubPayload, never>(
    ConversationOperations.Subscriptions.conversationUpdated,
    {
      onData: ({ data: { data, loading, error, variables }, client }) => {
        const updatedConv = data?.conversationUpdated?.conversation;
        if (!updatedConv) return;

        const isSeen = (updatedConv.id as string) === conversationId;

        if (isSeen) {
          onViewConv(conversationId, false);
        }
      },
    }
  );

  const onViewConv = async (
    conversationId: string,
    hasSeenLatestMessage: boolean | undefined
  ) => {
    /**
     * 1. Push the conv id to the router
     */
    router.push({ query: { conversationId } });
    /**
     * 2. Mark the conv as read if it's not
     */
    if (hasSeenLatestMessage) return;

    try {
      await markAsRead({
        variables: {
          conversationId,
        },
        optimisticResponse: {
          markConvAsRead: true,
        },
        update: (cache) => {
          const participantsFregmant = cache.readFragment<{
            participants: IParticipantPopulated[];
          }>({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment Participants on Conversation {
                participants {
                  user {
                    id
                    username
                  }
                  hasSeenLatestMessage
                }
              }
            `,
          });

          if (!participantsFregmant) return;

          const participants = [...participantsFregmant.participants];

          const partiIndex = participants.findIndex(
            (parti) => parti.user.id === session.user.id
          );
          if (partiIndex === -1) return;

          participants[partiIndex] = {
            ...participants[partiIndex],
            hasSeenLatestMessage: true,
          };

          /**
           * Update chache
           */
          cache.writeFragment({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment UpdatedParticipants on Conversation {
                participants
              }
            `,
            data: { participants },
          });
          //
        },
        refetchQueries: [
          { query: ConversationOperations.Queries.conversations },
        ],
      });
    } catch (error: any) {
      console.log("on view conversation error", error);
      toast.error(error.message);
    }
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

  if (conversationsError) {
    toast.error("There was an error fetching conversations");
    return null;
  }

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
