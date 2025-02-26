import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Comment, RawComment } from './AddNewComment.types';

export const getNormalizeComments = (rawComments: RawComment[]): Comment[] => {
  return rawComments.map((rawComment) => {
    const { avatarUrl, firstName, lastName, _id } = rawComment.creator;

    return {
      comment: rawComment.comment,
      commentId: rawComment._id,
      createdAt: rawComment.created_at,
      updatedAt: rawComment.updated_at,
      todoId: rawComment.todoId,
      user: {
        userId: _id,
        avatarUrl: avatarUrl,
        firstName: firstName,
        lastName: lastName,
      },
    };
  });
};

export const getDefaultComment = ({
  todoId,
  currentUserAvatarUrl,
  currentUserId,
}: {
  todoId: string;
  currentUserAvatarUrl: string;
  currentUserId: string;
}): Comment => {
  return {
    comment: '',
    commentId: uuidv4(),
    createdAt: '',
    updatedAt: '',
    todoId,
    user: {
      avatarUrl: currentUserAvatarUrl,
      firstName: '',
      lastName: '',
      userId: currentUserId,
    },
  };
};

export const getFormattedDate = (createdAt: string) =>
  dayjs(createdAt).format('D MMMM YYYY [at] HH:mm');

export const getIsSameDate = (createdAt: string, updatedAt: string) => {
  if (!createdAt || !updatedAt) {
    return false;
  }

  return dayjs(createdAt).isSame(dayjs(updatedAt));
};
