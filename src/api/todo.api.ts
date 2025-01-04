import axios from 'axios';
import {
  TodoCardForCreate,
  TodoCardProps,
} from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { ApiResponse } from '../types';

const BASE_URL = 'http://localhost:3000/todos';

export class TodoApi {
  static async addTodo(newTodo: TodoCardForCreate): ApiResponse<TodoCardProps> {
    const response = await axios.post(`${BASE_URL}/create`, newTodo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  static async updateTodo(todo: TodoCardProps): ApiResponse<TodoCardProps> {
    const response = await axios.patch(`${BASE_URL}/update`, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  static async deleteTodo(id: string): ApiResponse<TodoCardProps> {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }

  static async getTodos(): ApiResponse<TodoCardProps[]> {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  }

  static async getTodo(id: string): ApiResponse<TodoCardProps> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }
}
