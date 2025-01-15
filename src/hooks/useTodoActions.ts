import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { TodoApi } from '../api/todo.api';
import { TodoCardForCreate } from '../pages/TodosPage/components/TodoCard/TodoCard.types';
import { todosQueryKeys } from './useTodosFetch';
import { ADD_LOGGED_IN_ROUTES } from '../constants/routes';

export const useTodoActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateToDo = useMutation({
    mutationFn: async ({
      columnId,
      id,
      todo,
    }: {
      columnId: string;
      id: string;
      todo: TodoCardForCreate;
    }) => {
      const response = await TodoApi.updateTodo({ columnId, id, todo });
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('ToDo has been updated!');

      queryClient.invalidateQueries({
        queryKey: todosQueryKeys.todos.all(),
      });

      navigate(ADD_LOGGED_IN_ROUTES.TODOS);
    },
  });

  const deleteToDo = useMutation({
    mutationFn: async (id: string) => {
      const response = await TodoApi.deleteTodo(id);
      return response.data;
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
    handleUpdateToDo: updateToDo.mutate,
    handleDeleteToDo: deleteToDo.mutate,
  };
};
