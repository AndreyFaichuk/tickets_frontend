import { CreatorUser } from '../../types';

export type RawWorkspace = {
  _id: string;
  title: string;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  members: [
    { _id: string; firstName: string; lastName: string; avatarUrl: string },
  ];
  totalColumns: number;
  totalTickets: number;
  inviteToken: string;
  created_at: string;
  updated_at: string;
};

export type Workspace = {
  id: string;
  title: string;
  creator: CreatorUser;
  inviteToken: string;
  members: CreatorUser[];
  totalColumns: number;
  totalTickets: number;
  createdAt: string;
};
