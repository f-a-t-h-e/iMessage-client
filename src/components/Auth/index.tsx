import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

type IAuthProps = {
  session: Session | null;
  reloadSession: () => void;
};

const Auth = ({ reloadSession, session }: IAuthProps) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      console.log(username);

      /**
       * Create username mutation
       */
    } catch (error) {
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
            <Button width="100%" onClick={onSubmit}>
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
