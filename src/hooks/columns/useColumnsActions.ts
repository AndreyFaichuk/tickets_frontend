import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { ColumnApi } from '../../api/column.api';
import { columnsQueryKeys } from './useColumnsFetch';
import { CurrentDnDColumnType } from '../../pages/TodosPage/components/DnDToDoProvider/DnDToDoProvider.constants';

export type ColumnForUpdate = {
  title?: string;
};

export const useColumnActions = () => {
  const queryClient = useQueryClient();

  const createNewColumn = useMutation({
    mutationFn: async (columnName: string) => {
      const response = await ColumnApi.addColumn(columnName);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast('New Column has been added!');
      queryClient.invalidateQueries({
        queryKey: columnsQueryKeys.columns.all(),
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
        queryKey: columnsQueryKeys.columns.all(),
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
        queryKey: columnsQueryKeys.columns.all(),
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
        queryKey: columnsQueryKeys.columns.all(),
      });
    },
  });

  return {
    handleCreateNewColumn: createNewColumn.mutate,
    handleUpdateColumn: updateColumn.mutate,
    handleDeleteColumn: deleteColumn.mutate,
    handleMoveTodoColumns: moveTodoColumns.mutate,
  };
};
