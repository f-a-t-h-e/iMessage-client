import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { IMessagePopulated } from "../../../../../../backend/src/utils/types";

interface IMessageItemProps {
  message: IMessagePopulated;
  isSender: boolean;
  user: any;
}

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

const MessageItem = ({ user, isSender, message }: IMessageItemProps) => {
  console.log(
    "🚀 ~ file: MessageItem.tsx:11 ~ MessageItem ~ user",
    user,
    message.sender.id,
    message.sender.username,
    isSender
  );

  console.log(message);
  return (
    <Flex
      direction={isSender ? "row-reverse" : "row"}
      p={4}
      gap={4}
      _hover={{ bg: "whiteAlpha.200" }}
    >
      {/* <div> */}
      {/* TO_DO : make the images stored inside a store */}
      {!isSender && (
        <Flex align="flex-end">
          <Avatar src={message.sender.image} size="sm" />
        </Flex>
      )}
      {/* </div> */}

      <Flex gap={1} width="100%" direction="column">
        <Flex align="center" gap={4} justify={isSender ? "right" : "left"}>
          {!isSender && (
            <Text
              fontWeight={500}
              textAlign={isSender ? "right" : "left"}
              textTransform="capitalize"
            >
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {formatRelative(message.createdAt, Date.now(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[
                    token as keyof typeof formatRelativeLocale
                  ],
              },
            })}
          </Text>
        </Flex>
        <Flex justify={isSender ? "right" : "left"}>
          <Text
            bg={isSender ? "brand.100" : "whiteAlpha.300"}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="75%"
            borderBottomRightRadius={isSender ? 0 : undefined}
            borderBottomLeftRadius={isSender ? undefined : 0}
          >
            {message.body}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MessageItem;
