import { Session } from "next-auth";
import React from "react";

type IFeedWrapperProps = {
  session: Session;
};

const FeedWrapper = ({ session }: IFeedWrapperProps) => {
  return <div>FeedWrapper</div>;
};

export default FeedWrapper;
