import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ColumnApi } from '@api/column.api';
import { getNormalizeColumns } from '@pages/TodosPage/components/DnDToDoProvider/DnDToDoProvider.utils';
import { SelectOptions } from '@shared/FormSelect/FormSelect';
import { useWorkspaceStore } from '@stores/workspacesStore';

export const columnsQueryKeys = {
  columns: {
    all: (workspaceId: string) => ['columns', 'all', workspaceId],
    one: (id: string) => ['column', 'one', id],
  },
};

export const useColumnsFetch = () => {
  const currentWorkspaceId = useWorkspaceStore.currentWorkspaceId();

  const { data: allColumns, isLoading } = useQuery({
    queryKey: columnsQueryKeys.columns.all(currentWorkspaceId),
    queryFn: async () => {
      const response = await ColumnApi.getColumns(currentWorkspaceId);
      const normalizedColumns = getNormalizeColumns(response.data);
      return normalizedColumns;
    },
    enabled: !!currentWorkspaceId,
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
