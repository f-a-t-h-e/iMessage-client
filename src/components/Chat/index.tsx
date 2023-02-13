import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

type IChatProps = {};

const Chat = (props: IChatProps) => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Chat;
