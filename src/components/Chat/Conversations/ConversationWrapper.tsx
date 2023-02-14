import { Session } from "next-auth";
import React from "react";

type IConversationWrapperProps = {
  session: Session;
};

const ConversationWrapper = (props: IConversationWrapperProps) => {
  return <div>ConversationWrapper</div>;
};

export default ConversationWrapper;
