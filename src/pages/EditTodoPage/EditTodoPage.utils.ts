import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';
import { TodoCardProps } from '../TodosPage/components/TodoCard/TodoCard.types';

export const normalizeFormData = (todo: TodoCardProps): TodoValues => {
  return {
    description: todo.description,
    name: todo.name,
    progress: Math.min(todo.progress, 100),
    priority: todo.priority,
  };
};
