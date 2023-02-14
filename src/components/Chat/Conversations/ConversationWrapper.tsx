import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import ConversationList from "./ConversationList";

type IConversationWrapperProps = {
  session: Session;
};

const ConversationWrapper = ({ session }: IConversationWrapperProps) => {
  return (
    <Box w={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py="6" px="3">
      {/* Skelton Loader */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationWrapper;
