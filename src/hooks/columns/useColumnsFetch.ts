import { useQuery } from '@tanstack/react-query';
import { ColumnApi } from '../../api/column.api';

export const columnsQueryKeys = {
  columns: {
    all: () => ['columns', 'all'],
    one: (id: string) => ['columns', 'one', id],
  },
};

export const useColumnsFetch = () => {
  const { data: allColumns, isLoading } = useQuery({
    queryKey: columnsQueryKeys.columns.all(),
    queryFn: async () => {
      const response = await ColumnApi.getColumns();
      return response.data;
    },
    retry: false,
  });

  // const { isConnected } = useSocketTodos();

  return {
    allColumns: allColumns ?? [],
    areAllColumnsLoading: isLoading,
  };
};
