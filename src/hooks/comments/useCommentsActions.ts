import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { CommentsApi } from '@api/comments.api';

import { commentsQueryKeys } from './useCommentsFetch';

export type CreateCommentValues = {
  todoId: string;
  comment: string;
};

export const useCommentsActions = (todoId: string) => {
  const queryClient = useQueryClient();

  const createComment = useMutation({
    mutationFn: async (commentValues: CreateCommentValues) => {
      const response = await CommentsApi.createComment(commentValues);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.comments.all(todoId),
      });
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({
      comment,
      commentId,
    }: {
      comment: string;
      commentId: string;
    }) => {
      const response = await CommentsApi.updateComment(comment, commentId);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.comments.all(todoId),
      });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await CommentsApi.deleteComment(todoId, commentId);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.comments.all(todoId),
      });
    },
  });

  return {
    handleCreateComment: createComment.mutate,
    handleDeleteComment: deleteComment.mutate,
    handleUpdateComment: updateComment.mutate,
  };
};
