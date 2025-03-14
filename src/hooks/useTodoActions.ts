import { useNavigate } from 'react-router-dom';

import { TodoValues } from '@shared/ToDoForm/ToDoForm.schema';
import { useWorkspaceStore } from '@stores/workspacesStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { TodoApi } from '@api/todo.api';

import { ADD_LOGGED_IN_ROUTES } from '../constants/routes';

import { columnsQueryKeys } from './columns/useColumnsFetch';
import { workspacesQueryKeys } from './workspaces/useWorkspacesFetch';

export const useTodoActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentWorkspaceId = useWorkspaceStore.currentWorkspaceId();

  const updateToDo = useMutation({
    mutationFn: async ({ id, todo }: { id: string; todo: TodoValues }) => {
      const formData = new FormData();

      todo.attachments.forEach((attachment) => {
        formData.append('attachments', attachment);
      });

      formData.append('name', todo.name);
      formData.append('description', todo.description);
      formData.append('priority', todo.priority);
      formData.append('progress', String(todo.progress));

      const response = await TodoApi.updateTodo(id, formData);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('ToDo has been updated!');

      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });

      navigate(ADD_LOGGED_IN_ROUTES.TODOS);
    },
  });

  const deleteToDo = useMutation({
    mutationFn: async ({ id, columnId }: { id: string; columnId: string }) => {
      const response = await TodoApi.deleteTodo(id, columnId);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('ToDo has been deleted!');

      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });

      queryClient.invalidateQueries({
        queryKey: workspacesQueryKeys.workspaces.all(),
      });
    },
  });

  const createToDo = useMutation({
    mutationFn: async ({
      newTodo,
      columnId,
    }: {
      newTodo: TodoValues;
      columnId: string;
    }) => {
      const formData = new FormData();

      newTodo.attachments.forEach((attachment) => {
        formData.append('attachments', attachment);
      });

      formData.append('name', newTodo.name);
      formData.append('description', newTodo.description);
      formData.append('priority', newTodo.priority);
      formData.append('progress', String(newTodo.progress));

      const response = await TodoApi.createTodo(formData, columnId);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('ToDo has been created!');

      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });

      queryClient.invalidateQueries({
        queryKey: workspacesQueryKeys.workspaces.all(),
      });
    },
  });

  return {
    handleUpdateToDo: updateToDo.mutate,
    handleDeleteToDo: deleteToDo.mutate,
    handleCreateToDo: createToDo.mutate,
    isCreatingNewToDo: createToDo.isPending,
    isUpdatingToDo: updateToDo.isPending,
  };
};
