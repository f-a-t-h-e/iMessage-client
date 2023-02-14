import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ISearchedUser } from "@/utils/types";
import { IoIosCloseCircleOutline } from "react-icons/io";

type IParticipantsProps = {
  onRemoveParticipant: (userId: string) => void;
  participants: ISearchedUser[];
};

const Participants = ({
  onRemoveParticipant,
  participants,
}: IParticipantsProps) => {
  return (
    <Flex mt={8} gap="10px" wrap="wrap">
      {participants.map((parti) => (
        <Stack
          key={parti.id}
          direction="row"
          bg="whiteAlpha.200"
          align="center"
          borderRadius={4}
          p={2}
        >
          <Text>{parti.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => onRemoveParticipant(parti.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
