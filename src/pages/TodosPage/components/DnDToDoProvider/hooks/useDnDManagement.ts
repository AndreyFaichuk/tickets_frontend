import { TodoCardProps } from '../../TodoCard/TodoCard.types';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { useColumnsManagement } from './useColumnsManagement';
import { useState } from 'react';
import {
  CURRENT_DND_COLUMN_INITIAL_STATE,
  CurrentDnDColumnState,
  CurrentDnDColumnType,
} from '../DnDToDoProvider.constants';
import { useColumnActions } from '../../../../../hooks/columns/useColumnsActions';

export type ColumnType = {
  id: string;
  title: string;
  cards: TodoCardProps[];
};

export const useDnDManagement = () => {
  const { handleMoveTodoColumns } = useColumnActions();

  const { columnMap, setActiveCard, setColumns, columns, columnsHandlers } =
    useColumnsManagement();

  const [currentDnDColumnState, setCurrentDnDColumnState] =
    useState<CurrentDnDColumnState>({
      fromColumnId: '',
      todoId: '',
      fromTodoIndex: 0,
    });

  const handleUpdateCurrentDnDColumnState = (
    values: Partial<CurrentDnDColumnState>,
  ) => {
    setCurrentDnDColumnState((prevState) => {
      return { ...prevState, ...values };
    });
  };

  const findColumn = (id: string | null): ColumnType | null => {
    return (id && columnMap.get(id)) || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const itemIndex = event.active.data.current?.sortable.index;
    const columnId = event.active.data.current?.sortable.containerId;

    const activeId = String(event.active.id);
    const activeColumn = findColumn(activeId);

    handleUpdateCurrentDnDColumnState({
      [CURRENT_DND_COLUMN_INITIAL_STATE.todoId]: activeId,
      [CURRENT_DND_COLUMN_INITIAL_STATE.fromTodoIndex]: itemIndex,
      [CURRENT_DND_COLUMN_INITIAL_STATE.fromColumnId]: columnId,
    });

    if (activeColumn) {
      const activeItem = activeColumn.cards.find(
        (card) => card._id === activeId,
      );

      setActiveCard(activeItem || null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns((prevState) => {
      const activeItems = activeColumn.cards.filter(
        (card) => card._id !== activeId,
      );
      const overItems = overColumn.cards;

      const activeIndex = activeColumn.cards.findIndex(
        (card) => card._id === activeId,
      );
      const overIndex = overItems.findIndex((card) => card._id === overId);

      const newOverItems = [
        ...overItems.slice(0, overIndex + 1),
        activeColumn.cards[activeIndex],
        ...overItems.slice(overIndex + 1),
      ];

      return prevState.map((column) => {
        if (column.id === activeColumn.id) {
          return { ...column, cards: activeItems };
        }
        if (column.id === overColumn.id) {
          return { ...column, cards: newOverItems };
        }
        return column;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const columnId = event.active.data.current?.sortable.containerId;
    const itemIndex = event.over?.data.current?.sortable.index;

    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      setActiveCard(null);
      return;
    }

    const activeIndex = activeColumn.cards.findIndex(
      (card) => card._id === activeId,
    );

    handleMoveTodoColumns({
      ...currentDnDColumnState,
      toColumnId: columnId,
      toTodoIndex: itemIndex || 0,
    } as CurrentDnDColumnType);

    const overIndex = overColumn.cards.findIndex((card) => card._id === overId);

    if (activeIndex !== overIndex) {
      setColumns((prevState) =>
        prevState.map((column) =>
          column.id === activeColumn.id
            ? {
                ...column,
                cards: arrayMove(column.cards, activeIndex, overIndex),
              }
            : column,
        ),
      );
    }

    setActiveCard(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return {
    dnd: {
      sensors,
      handleDragEnd,
      handleDragOver,
      handleDragStart,
    },
    columns,
    columnsHandlers,
  };
};
