export type ChildrenProps = { children?: React.ReactNode };

export type ParticipantType = {
  id: number;
  fullname: string;
  email: string;
  passw: string;
  isBoss: boolean;
  createdAt: string;
};

export type ParticipantRequest = Omit<ParticipantType, "id">;

export type LoginType = Pick<ParticipantType, "email" | "passw">;

export type EventsType = {
  id: number;
  title: string;
  description: string;
  boss: BossType;
  shifts: ShiftType[];
  availabilities: AvailabilityType[];
};

export type BossType = {
  usern: number;
  company: string;
  birthday: string;
} & ParticipantType;

export type ShiftType = {
  id: number;
  start_time: string;
  end_time: string;
};

export type AvailabilityType = {
  id: number;
  is_allocated: boolean;
  participant: ParticipantType;
};

export type ParticipantSignupType = {
  is_allocated: boolean;
  participant_id: number;
  event_id: number;
  shift_id: number;
};
