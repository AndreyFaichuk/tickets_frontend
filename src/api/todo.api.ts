import {
  TodoCardForCreate,
  TodoCardProps,
} from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { securityAxios } from './securityAxios';
import { PromiseAxiosResponse } from '../types';

const BASE_URL = 'http://localhost:3000/columns/card';

export class TodoApi {
  static updateTodo({
    columnId,
    id,
    todo,
  }: {
    columnId: string;
    id: string;
    todo: TodoCardForCreate;
  }): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.patch(`${BASE_URL}/${columnId}/${id}`, todo);
    return response;
  }

  static deleteTodo(id: string): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.delete(`${BASE_URL}/${id}`);
    return response;
  }

  static getTodo(
    columnId: string,
    id: string,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.get(`${BASE_URL}/${columnId}/${id}`);
    return response;
  }
}
