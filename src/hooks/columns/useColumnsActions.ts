import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { ColumnApi } from '@api/column.api';
import { CurrentDnDColumnType } from '@pages/TodosPage/components/DnDToDoProvider/DnDToDoProvider.constants';
import { useWorkspaceStore } from '@stores/workspacesStore';

import { workspacesQueryKeys } from '../workspaces/useWorkspacesFetch';

import { columnsQueryKeys } from './useColumnsFetch';

export type ColumnForUpdate = {
  title?: string;
};

export type ColumnForReplace = {
  fromColumnId: string;
  toColumnId: string;
};

export type ColumnForCreate = {
  title: string;
  workspaceId: string;
};

export const useColumnActions = () => {
  const queryClient = useQueryClient();

  const currentWorkspaceId = useWorkspaceStore.currentWorkspaceId();

  const createNewColumn = useMutation({
    mutationFn: async (columnForCreate: ColumnForCreate) => {
      const response = await ColumnApi.addColumn(columnForCreate);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('New Column has been added!');
      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });

      queryClient.invalidateQueries({
        queryKey: workspacesQueryKeys.workspaces.all(),
      });
    },
  });

  const updateColumn = useMutation({
    mutationFn: async ({
      columnForUpdate,
      columnId,
    }: {
      columnForUpdate: ColumnForUpdate;
      columnId: string;
    }) => {
      const response = await ColumnApi.updateColumn(columnForUpdate, columnId);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('Column has been updated!');

      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });
    },
  });

  const deleteColumn = useMutation({
    mutationFn: async (id: string) => {
      const response = await ColumnApi.deleteColumn(id);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('Column has been deleted!');

      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });

      queryClient.invalidateQueries({
        queryKey: workspacesQueryKeys.workspaces.all(),
      });
    },
  });

  const moveTodoColumns = useMutation({
    mutationFn: async (moveTodo: CurrentDnDColumnType) => {
      await ColumnApi.moveTodoColumns(moveTodo);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('Todo has been moved!');

      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });
    },
  });

  const replaceAllTodosToColumn = useMutation({
    mutationFn: async (body: ColumnForReplace) => {
      const response = await ColumnApi.replaceAllTodosToColumn(body);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
      });
    },
  });

  return {
    handleCreateNewColumn: createNewColumn.mutate,
    handleUpdateColumn: updateColumn.mutate,
    handleMoveTodoColumns: moveTodoColumns.mutate,
    handleDeleteColumn: deleteColumn.mutateAsync,
    handleReplaceAllTodosToColumn: replaceAllTodosToColumn.mutateAsync,
  };
};
