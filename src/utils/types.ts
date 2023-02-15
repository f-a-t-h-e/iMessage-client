import {
  IConversationPopulated,
  IMessagePopulated,
} from "../../../backend/src/utils/types";
/* USERS */
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface ISearchUserInput {
  username: string;
}

export interface ISearchUserData {
  searchUsers: ISearchedUser[];
}

export interface ISearchedUser {
  id: string;
  username: string;
  image: string;
}

/* CONVERSATIONS */
export interface ICreateConversationInput {
  participantIds: string[];
}

export interface ICreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface IConversationsData {
  /** TO_DO */
  conversations: IConversationPopulated[];
}

/**
 * MESSAGES
 */

export interface IMessagesData {
  /**
   * TO_DO
   */
  messages: IMessagePopulated[];
}

export interface IGetMessagesInput {
  conversationId: string;
  skip?: number;
  take?: number;
}

export interface ISendMessageInput {
  conversationId: string;
  body: string;
}

export interface IMessageSubData {
  subscriptionData: {
    data: {
      messageSent: IMessagePopulated;
    };
  };
}
