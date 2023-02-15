import { useQuery } from "@apollo/client";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import {
  IGetMessagesInput,
  IMessagesData,
  IMessageSubData,
} from "@/utils/types";
import MessageOperations from "@/graphql/operations/message";
import toast from "react-hot-toast";
import SkeletonLoader from "@/components/Common/SkeletonLoader";
import { useEffect } from "react";

interface IMessagesProps {
  userId: string;
  conversationId: string;
}

const Messages = ({ conversationId, userId }: IMessagesProps) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    IMessagesData,
    IGetMessagesInput
  >(MessageOperations.Queries.messages, {
    variables: {
      conversationId,
    },
    // onError: ({ message }) => {
    //   toast.error(message);
    // },
    // onCompleted:()=>{}
  });
  const subToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: IMessageSubData) => {
        if (!subscriptionData) {
          return prev;
        }
        console.log("well", subscriptionData);

        const newMessage = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages],
        });
      },
    });
  };

  useEffect(() => {
    subToMoreMessages(conversationId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);
  console.log("DDDDDD", data);
  if (error) {
    toast.error(error.message);
    return (
      <Flex
        h="100%"
        justify="center"
        align="center"
        textAlign="center"
        lineHeight="2rem"
      >
        Something went wrong! 😥
        <br />
        Try reloading or visiting another conversation
      </Flex>
    );
  }
  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading ? (
        <Stack spacing={4} p={4}>
          <SkeletonLoader count={5} height="60px" />
        </Stack>
      ) : (
        data &&
        (data.messages.length !== 0 ? (
          <Flex direction="column-reverse" overflowY="auto" h="100%">
            {data.messages.map((message) => (
              <div key={message.id}>
                {message.body}
                {/* <Message /> */}
              </div>
            ))}
          </Flex>
        ) : (
          <Box>
            <Text align="center">No messages yet, say hi 😁</Text>
          </Box>
        ))
      )}
    </Flex>
  );
};

export default Messages;
