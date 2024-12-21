import { useQuery } from '@tanstack/react-query';

import { TodoApi } from '../api/todo.api';
import { todosQueryKeys } from './useTodosFetch';

export const useTodoFetchById = (id: string) => {
  const { data: oneTodo, isLoading: isOneToDoLoading } = useQuery({
    queryKey: todosQueryKeys.todos.one(id),
    queryFn: async () => {
      const response = await TodoApi.getTodo(id);
      return response;
    },
  });

  return {
    oneTodo: oneTodo,
    isOneToDoLoading,
  };
};
