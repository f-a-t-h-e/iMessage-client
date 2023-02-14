import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import ConversationModal from "./Modal";

type IConversationListProps = {
  session: Session;
};

const ConversationList = ({ session }: IConversationListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  return (
    <Box w="100%">
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
    </Box>
  );
};

export default ConversationList;
