import { useEffect, useMemo, useState } from 'react';
import { useColumnActions } from '../../../../../hooks/columns/useColumnsActions';
import { TodoCardProps } from '../../TodoCard/TodoCard.types';

export type ColumnType = {
  id: string;
  title: string;
  cards: TodoCardProps[];
};

export const useColumnsManagement = (data: ColumnType[]) => {
  const { handleCreateNewColumn } = useColumnActions();

  const [columns, setColumns] = useState<ColumnType[]>(data);
  const [activeCard, setActiveCard] = useState<TodoCardProps | null>(null);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  const handleAddNewColumnToList = (columnTitle: string) => {
    handleCreateNewColumn(columnTitle);
  };

  const columnMap = useMemo(() => {
    const map = new Map<string, ColumnType>();

    columns.forEach((col) => {
      map.set(col.id, col);
      col.cards.forEach((card) => map.set(card._id, col));
    });

    return map;
  }, [columns]);

  return {
    columnMap,
    setActiveCard,
    setColumns,
    columns: {
      currentColumns: columns,
      activeCard,
    },
    columnsHandlers: {
      handleAddNewColumnToList,
    },
  };
};
