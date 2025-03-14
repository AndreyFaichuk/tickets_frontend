import { useQuery } from '@tanstack/react-query';

import { CommentsApi } from '@api/comments.api';
import {
  getDefaultComment,
  getNormalizeComments,
} from '@shared/CommentsBlock/AddNewComment.utils';
import { useGetCurrentUser } from '../user/useGetCurrentUser';

export const commentsQueryKeys = {
  comments: {
    all: (todoId: string) => ['comments', 'all', todoId],
    one: (id: string) => ['comment', 'one', id],
  },
};

export const useCommentsFetch = (todoId: string) => {
  const { currentUser, isCurrentUserLoading } = useGetCurrentUser();

  const { data: allComments, isLoading } = useQuery({
    queryKey: commentsQueryKeys.comments.all(todoId),
    queryFn: async () => {
      const response = await CommentsApi.getComments(todoId);

      const normalizedComments = getNormalizeComments(response.data);
      const initialComment = getDefaultComment({
        currentUserAvatarUrl: currentUser.avatarUrl,
        currentUserId: currentUser._id,
        todoId,
      });

      return [initialComment, ...normalizedComments];
    },
    staleTime: 1000 * 60,
    retry: false,
    enabled: !isCurrentUserLoading,
  });

  return {
    allComments: allComments ?? [],
    areAllCommentsLoading: isLoading,
  };
};
