import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { TodoApi } from '../api/todo.api';
import { TodoCardProps } from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { todosQueryKeys } from './useTodosFetch';

export const useTodoActions = () => {
  const queryClient = useQueryClient();

  const createNewToDo = useMutation({
    mutationFn: async (newToDo: TodoCardProps) => {
      const response = await TodoApi.addTodo(newToDo);
      return response;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('New ToDo has been added!');
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.todos.all() });
    },
  });

  const updateToDo = useMutation({
    mutationFn: async (toDo: TodoCardProps) => {
      const response = await TodoApi.updateTodo(toDo);
      return response;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('ToDo has been updated!');

      queryClient.invalidateQueries({
        queryKey: todosQueryKeys.todos.all(),
      });
    },
  });

  const deleteToDo = useMutation({
    mutationFn: async (id: string) => {
      const response = await TodoApi.deleteTodo(id);
      return response;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('ToDo has been deleted!');

      queryClient.invalidateQueries({
        queryKey: todosQueryKeys.todos.all(),
      });
    },
  });

  return {
    handleCreateNewToDo: createNewToDo.mutate,
    handleUpdateToDo: updateToDo.mutate,
    handleDeleteToDo: deleteToDo.mutate,
  };
};
