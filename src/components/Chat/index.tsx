import { Button, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

type IChatProps = {
  session: Session;
};

const Chat = ({ session }: IChatProps) => {
  return (
    <Flex h="100vh">
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
    </Flex>
  );
};

export default Chat;
