import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";

import { IConversationsData } from "@/utils/types";
import ConversationModal from "./Modal";
import ConversationItem from "./ConversationItem";
import { useRouter } from "next/router";

type IConversationListProps = {
  session: Session;
  conversations: IConversationsData["conversations"];
  onViewConv: (
    conversationId: string,
    hasSeenLatestMessage: boolean
  ) => Promise<void>;
};

const ConversationList = ({
  session,
  conversations,
  onViewConv,
}: IConversationListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  return (
    <Box w="100%" height="100%" overflowY="auto">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onModalOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800">
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isModalOpen} onClose={onModalClose} />
      {[...conversations]
        .sort((a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf())
        .map((conversation) => {
          const hasSeenLatestMessage = conversation.participants.find(
            (parti) => parti.user.id === userId
          )?.hasSeenLatestMessage;

          return (
            <ConversationItem
              key={conversation.id}
              hasSeenLatestMessage={hasSeenLatestMessage}
              userId={userId}
              conversation={conversation}
              onClick={() => onViewConv(conversation.id, hasSeenLatestMessage)}
              isSelected={conversation.id === router.query.conversationId}
            />
          );
        })}
    </Box>
  );
};

export default ConversationList;
