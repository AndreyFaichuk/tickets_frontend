import { TodoCardProps } from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { securityAxios } from './securityAxios';
import { PromiseAxiosResponse } from '../types';

const BASE_URL = 'http://localhost:3000/todos';

export class TodoApi {
  static updateTodo(
    id: string,
    todo: FormData,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios
      .create({ isFormData: true })
      .patch(`${BASE_URL}/${id}`, todo);
    return response;
  }

  static deleteTodo(
    id: string,
    columnId: string,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.delete(`${BASE_URL}/${id}/${columnId}`);
    return response;
  }

  static createTodo(
    newTodo: FormData,
    columnId: string,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios
      .create({ isFormData: true })
      .post(`${BASE_URL}/${columnId}`, newTodo);
    return response;
  }

  static getTodo(id: string): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.get(`${BASE_URL}/${id}`);
    return response;
  }
}
