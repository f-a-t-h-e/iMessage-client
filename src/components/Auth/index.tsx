import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import UserOperations from "@/graphql/operations/user";
import { useMutation } from "@apollo/client";
import type {
  CreateUsernameData,
  CreateUsernameVariables,
} from "@/utils/types";
import { toast } from "react-hot-toast";

type IAuthProps = {
  session: Session | null;
  reloadSession: () => void;
};

const Auth = ({ reloadSession, session }: IAuthProps) => {
  const [username, setUsername] = useState("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);
  console.log(
    "🚀 ~ file: index.tsx:21 ~ Auth ~ loading, error",
    loading,
    error
  );

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error("");
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success(`Welcome ${username}! 🎉`);

      /**
       * Reload session to ontain the new username
       */
      reloadSession();
    } catch (error: any) {
      toast.error(error.message);
      console.log("🚀 ~ file: index.tsx:18 ~ onSubmit ~ error", error);
    }
  };
  return (
    <Center h="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit} isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">iMessage</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  alt="google-logo"
                  h="20px"
                  src="./images/googlelogo.png"
                />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
