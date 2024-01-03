export type ParticipantType = {
  id: number;
  fullname: string;
  email: string;
  passw: string;
  isBoss: boolean;
  createdAt: string;
};

export type EventType = {
  id: number;
  title: string;
  description: string;
};
export type ChildrenProps = { children?: React.ReactNode };
