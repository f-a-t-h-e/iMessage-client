import { IConversationPopulated } from "../../../backend/src/utils/types";
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
