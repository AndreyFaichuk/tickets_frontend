import { BASE_BACKEND_URL } from '@constants';
import { TodoCardProps } from '@pages/TodosPage/components/TodoCard/TodoCard.types';
import { PromiseAxiosResponse } from '@types';

import { securityAxios } from './securityAxios';

const TODO_URL = `${BASE_BACKEND_URL}/todos`;

export class TodoApi {
  static updateTodo(
    id: string,
    todo: FormData,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios
      .create({ isFormData: true })
      .patch(`${TODO_URL}/${id}`, todo);
    return response;
  }

  static deleteTodo(
    id: string,
    columnId: string,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.delete(`${TODO_URL}/${id}/${columnId}`);
    return response;
  }

  static createTodo(
    newTodo: FormData,
    columnId: string,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios
      .create({ isFormData: true })
      .post(`${TODO_URL}/${columnId}`, newTodo);
    return response;
  }

  static getTodo(id: string): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.get(`${TODO_URL}/${id}`);
    return response;
  }
}
