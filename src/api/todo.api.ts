import {
  TodoCardForCreate,
  TodoCardProps,
} from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { securityAxios } from './securityAxios';
import { PromiseAxiosResponse } from '../types';

const BASE_URL = 'http://localhost:3000/todos';

export class TodoApi {
  static addTodo(
    newTodo: TodoCardForCreate,
  ): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.post(`${BASE_URL}/create`, newTodo);
    return response;
  }

  static updateTodo(todo: TodoCardProps): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.patch(`${BASE_URL}/update`, todo, {});
    return response;
  }

  static deleteTodo(id: string): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.delete(`${BASE_URL}/${id}`);
    return response;
  }

  static getTodos(): PromiseAxiosResponse<TodoCardProps[]> {
    const response = securityAxios.get(`${BASE_URL}/all`);
    return response;
  }

  static getTodo(id: string): PromiseAxiosResponse<TodoCardProps> {
    const response = securityAxios.get(`${BASE_URL}/${id}`);
    return response;
  }
}
