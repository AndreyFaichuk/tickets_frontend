import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { ColumnApi } from '../../api/column.api';
import { columnsQueryKeys } from './useColumnsFetch';
import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';

type ToDoForColumn = TodoValues & {
  columnId: string;
};

export type ColumnForUpdate = {
  title?: string;
  card: ToDoForColumn;
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
    mutationFn: async (columnForUpdate: ColumnForUpdate) => {
      const response = await ColumnApi.updateColumn(columnForUpdate);
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

  return {
    handleCreateNewColumn: createNewColumn.mutate,
    handleUpdateColumn: updateColumn.mutate,
    handleDeleteColumn: deleteColumn.mutate,
  };
};
