import { RawComment } from '../components/shared/CommentsBlock/AddNewComment.types';
import { BASE_URL } from '../constants';
import { CreateCommentValues } from '../hooks/comments/useCommentsActions';
import { PromiseAxiosResponse } from '../types';
import { securityAxios } from './securityAxios';

const COMMENT_URL = `${BASE_URL}/comments`;

export class CommentsApi {
  static async createComment(commentValues: CreateCommentValues) {
    const response = await securityAxios.post(
      `${COMMENT_URL}/create`,
      commentValues,
    );

    return response.data;
  }

  static async updateComment(comment: string, commentId: string) {
    const response = await securityAxios.patch(`${COMMENT_URL}/${commentId}`, {
      comment,
    });

    return response.data;
  }

  static getComments(todoId: string): PromiseAxiosResponse<RawComment[]> {
    const response = securityAxios.get(`${COMMENT_URL}/all/${todoId}`);
    return response;
  }

  static deleteComment(commentId: string): PromiseAxiosResponse<RawComment> {
    const response = securityAxios.delete(`${COMMENT_URL}/${commentId}`);
    return response;
  }
}
