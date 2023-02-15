import { Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";

type IFeedWrapperProps = {
  session: Session;
};

const FeedWrapper = ({ session }: IFeedWrapperProps) => {
  const router = useRouter();

  const { conversationId } = router.query;

  if (conversationId) {
    return (
      <Flex
        justify="center"
        align="center"
        display={{ base: "none", md: "flex" }}
        w="100%"
      >
        <Text fontWeight="semibold" userSelect="none">
          No Conversation selected
        </Text>
      </Flex>
    );
  }

  return (
    <Flex w="100%" direction="column">
      <Flex>{conversationId}</Flex>
      {/* INPUT-BOX */}
    </Flex>
  );
};

export default FeedWrapper;
