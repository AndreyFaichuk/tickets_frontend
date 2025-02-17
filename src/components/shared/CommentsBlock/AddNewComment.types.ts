import { User } from '../../../app/DefaultUserMenu/DefaultUserMenu.types';

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

type CommentUser = Pick<User, 'avatarUrl' | 'firstName' | 'lastName'> & {
  userId: string;
};

export type Comment = {
  comment: string;
  commentId: string;
  createdAt: string;
  updatedAt: string;
  todoId: string;
  user: CommentUser;
};
