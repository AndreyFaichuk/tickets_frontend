import {
  TodoCardForCreate,
  TodoCardProps,
} from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { ApiResponse } from '../types';

const BASE_URL = 'http://localhost:3000/todos';

export class TodoApi {
  static async addTodo(newTodo: TodoCardForCreate): ApiResponse<TodoCardProps> {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    const todo: TodoCardProps = await response.json();
    return todo;
  }

  static async updateTodo(todo: TodoCardProps): ApiResponse<TodoCardProps> {
    const response = await fetch(`${BASE_URL}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    const res: TodoCardProps = await response.json();
    return res;
  }

  static async deleteTodo(id: string): ApiResponse<TodoCardProps> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    const res: TodoCardProps = await response.json();
    return res;
  }

  static async getTodos(): ApiResponse<TodoCardProps[]> {
    const response = await fetch(`${BASE_URL}/all`);
    const todos: TodoCardProps[] = await response.json();
    return todos;
  }

  static async getTodo(id: string): ApiResponse<TodoCardProps> {
    const response = await fetch(`${BASE_URL}/${id}`);
    const todo: TodoCardProps = await response.json();
    return todo;
  }
}
