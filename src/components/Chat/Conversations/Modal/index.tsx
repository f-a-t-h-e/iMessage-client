import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  Stack,
  Input,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import UserOperations from "@/graphql/operations/user";
import {
  ISearchedUser,
  ISearchUserData,
  ISearchUserInput,
} from "@/utils/types";
import UsersSearchList from "./UsersSearchList";
import Participants from "./Participants";

type IModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConversationModal = ({ isOpen, onClose }: IModalProps) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<ISearchedUser[]>([]);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    ISearchUserData,
    ISearchUserInput
  >(UserOperations.Queries.searchUsers);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // searchUsers query
    e.preventDefault();
    console.log("Click");

    searchUsers({ variables: { username } });
  };

  const onRemoveParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter(({ id }) => id !== userId));
  };
  const onAddParticipant = (user: ISearchedUser) => {
    /* HINT : This filter function is to prevent duplication
     * when adding the same user
     * Notice that the Big(O) of this is almost the same as [..prev, user]
     *
     * TO_DO : I don't know if this may be worse for memory
     */
    setParticipants((prev) => {
      const newArr = prev.filter(({ id }) => id !== user.id);
      newArr.push(user);
      return newArr;
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create a conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {(data && (
              <UsersSearchList
                onAddParticipant={onAddParticipant}
                users={data.searchUsers}
              />
            )) ||
              ""}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  onRemoveParticipant={onRemoveParticipant}
                />
                <Button
                  bg="brand.100"
                  w="100%"
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
