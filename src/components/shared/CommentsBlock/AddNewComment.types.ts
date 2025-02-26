import { CreatorUser } from '../../../types';

export type RawComment = {
  _id: string;
  comment: string;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  todoId: string;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  comment: string;
  commentId: string;
  createdAt: string;
  updatedAt: string;
  todoId: string;
  user: CreatorUser;
};
