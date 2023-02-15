import React from "react";
import { ISearchedUser } from "@/utils/types";
import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface IUsersSearchListProps {
  users: ISearchedUser[];
  onAddParticipant: (user: ISearchedUser) => void;
}

const UsersSearchList = ({
  users,
  onAddParticipant,
}: IUsersSearchListProps) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text userSelect="none">No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar src={user.image} />
              <Flex justify="space-between" align="center" w="100%">
                <Text color="whiteAlpha.700" textTransform="capitalize">
                  {user.username}
                </Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  onClick={() => onAddParticipant(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UsersSearchList;
