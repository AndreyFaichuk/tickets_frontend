import { useQuery } from '@tanstack/react-query';

import { TodoApi } from '../api/todo.api';

export const todosQueryKeys = {
  todos: {
    all: () => ['todos', 'all'],
    one: (id: string) => ['todos', 'one', id],
  },
};

export const useTodoFetchById = (id: string) => {
  const { data: oneTodo, isLoading: isOneToDoLoading } = useQuery({
    queryKey: todosQueryKeys.todos.one(id),
    queryFn: async () => {
      const response = await TodoApi.getTodo(id);
      return response.data;
    },
  });

  return {
    oneTodo: oneTodo,
    isOneToDoLoading,
  };
};
