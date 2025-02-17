import { RawComment } from '../components/shared/CommentsBlock/AddNewComment.types';
import { CreateCommentValues } from '../hooks/comments/useCommentsActions';
import { PromiseAxiosResponse } from '../types';
import { securityAxios } from './securityAxios';

const BASE_URL = 'http://localhost:3000/comments';

export class CommentsApi {
  static async createComment(commentValues: CreateCommentValues) {
    const response = await securityAxios.post(
      `${BASE_URL}/create`,
      commentValues,
    );

    return response.data;
  }

  static async updateComment(comment: string, commentId: string) {
    const response = await securityAxios.patch(`${BASE_URL}/${commentId}`, {
      comment,
    });

    return response.data;
  }

  static getComments(todoId: string): PromiseAxiosResponse<RawComment[]> {
    const response = securityAxios.get(`${BASE_URL}/all/${todoId}`);
    return response;
  }

  static deleteComment(commentId: string): PromiseAxiosResponse<RawComment> {
    const response = securityAxios.delete(`${BASE_URL}/${commentId}`);
    return response;
  }
}
