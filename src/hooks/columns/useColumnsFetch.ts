import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ColumnApi } from '../../api/column.api';
import { SelectOptions } from '../../components/shared/FormSelect/FormSelect';

export const columnsQueryKeys = {
  columns: {
    all: () => ['columns', 'all'],
    one: (id: string) => ['column', 'one', id],
  },
};

export const useColumnsFetch = () => {
  const { data: allColumns, isLoading } = useQuery({
    queryKey: columnsQueryKeys.columns.all(),
    queryFn: async () => {
      const response = await ColumnApi.getColumns();
      return response.data;
    },
    staleTime: 1000 * 60,
    retry: false,
  });

  const columnsOptions: SelectOptions = useMemo(
    () =>
      allColumns?.map((column) => ({
        label: column.title,
        value: column.id,
      })) ?? [],
    [allColumns],
  );

  return {
    allColumns: allColumns ?? [],
    areAllColumnsLoading: isLoading,
    columnsOptions,
  };
};
