import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

type IChatProps = {
  session: Session;
};

const Chat = ({ session }: IChatProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  /**
   * Note : I don't know why I have to do this for Firefox
   */
  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);
  return (
    <Flex h="100vh">
      {/* <Button onClick={toggleColorMode}>
        Toggle to {colorMode === "light" ? "Dark" : "Light"}
      </Button> */}
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
    </Flex>
  );
};

export default Chat;
