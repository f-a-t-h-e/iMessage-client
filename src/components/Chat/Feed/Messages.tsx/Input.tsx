import { useMutation } from "@apollo/client";
import { Box, Flex, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { FormEvent, useRef } from "react";
import { toast } from "react-hot-toast";
import MessageOperations from "@/graphql/operations/message";
import { ISendMessageInput } from "../../../../utils/types";

interface IMessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput = ({ conversationId, session }: IMessageInputProps) => {
  const newMessageRef = useRef<HTMLInputElement>(null);

  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    ISendMessageInput
  >(MessageOperations.Mutations.sendMessage);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = newMessageRef.current?.value;
    if (!body) {
      return;
    }
    const value = body;
    newMessageRef.current.value = "";
    try {
      /**
       * Call sendMessage mutation
       */

      const { data, errors } = await sendMessage({
        variables: {
          body,
          conversationId,
        },
      });
      if (!data?.sendMessage || errors) {
        errors?.forEach((error) => toast.error(error.message));

        newMessageRef.current.value = value;
        return;
      }
    } catch (error: any) {
      console.log("🚀 ~ error", error);
      newMessageRef.current.value = value;
      toast.error(error.message);
    }
  };
  return (
    <Box px={4} py={6} w="100%">
      <form onSubmit={onSubmit}>
        <Input
          ref={newMessageRef}
          size="md"
          placeholder="New message"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.500",
          }}
          resize="none"
        />
      </form>
    </Box>
  );
};

export default MessageInput;
