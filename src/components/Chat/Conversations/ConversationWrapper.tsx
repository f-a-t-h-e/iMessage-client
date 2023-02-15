import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
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
  } = useQuery<IConversationsData>(
    ConversationOperations.Queries.conversations
  );

  console.log("!!!", conversationsData);

  return (
    <Box w={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py="6" px="3">
      {/* Skelton Loader */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationWrapper;
