import { useQuery } from '@tanstack/react-query';

import { TodoApi } from '../api/todo.api';
import { todosQueryKeys } from './useTodosFetch';

export const useTodoFetchById = (columnId: string, id: string) => {
  const { data: oneTodo, isLoading: isOneToDoLoading } = useQuery({
    queryKey: todosQueryKeys.todos.one(id),
    queryFn: async () => {
      const response = await TodoApi.getTodo(columnId, id);
      return response.data;
    },
  });

  return {
    oneTodo: oneTodo,
    isOneToDoLoading,
  };
};
