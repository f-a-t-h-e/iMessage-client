import { IParticipantPopulated } from "../../../backend/src/utils/types";

export const formatUsernames = (
  participants: IParticipantPopulated[],
  myUserId: string
): string => {
  const usernames = participants
    .filter((participant) => participant.user.id != myUserId)
    .map((participant) => participant.user.username);

  return usernames.join(", ");
};
