import { Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages.tsx/Header";
import React from "react";

type IFeedWrapperProps = {
  session: Session;
};

const FeedWrapper = ({ session }: IFeedWrapperProps) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex
      w="100%"
      direction="column"
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            <MessagesHeader
              userId={session.user.id}
              conversationId={conversationId}
            />
            {/* <Messages
              userId={session.user.id}
              conversationId={conversationId}
            /> */}
          </Flex>
          {/* <MessageInput session={session} conversationId={conversationId} /> */}
        </>
      ) : (
        <>{"<NoConversationSelected />"}</>
      )}
    </Flex>
  );
};

export default FeedWrapper;
