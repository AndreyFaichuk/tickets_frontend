import { useMemo, useState } from 'react';
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

export type ColumnType = {
  id: string;
  title: string;
  cards: TodoCardProps[];
};

const initialCards1: TodoCardProps[] = [
  { _id: '1', name: 'One', description: 'Test', progress: 80 },
  { _id: '2', name: 'Two', description: 'Test', progress: 80 },
  { _id: '3', name: 'Three', description: 'Test', progress: 80 },
  { _id: '4', name: 'Four', description: 'Test', progress: 80 },
];

const initialCards2: TodoCardProps[] = [
  { _id: '5', name: 'Five', description: 'Test', progress: 80 },
  { _id: '6', name: 'Six', description: 'Test', progress: 80 },
  { _id: '7', name: 'Seven', description: 'Test', progress: 80 },
  { _id: '8', name: 'Eight', description: 'Test', progress: 80 },
];

const initialCards3: TodoCardProps[] = [
  { _id: '9', name: '9', description: 'Test', progress: 80 },
  { _id: '10', name: '10', description: 'Test', progress: 80 },
  { _id: '11', name: '11', description: 'Test', progress: 80 },
  { _id: '12', name: '12', description: 'Test', progress: 80 },
];

const data: ColumnType[] = [
  {
    id: 'Column1',
    title: 'Column 1',
    cards: initialCards1,
  },
  {
    id: 'Column2',
    title: 'Column 2',
    cards: initialCards2,
  },
  {
    id: 'Column3',
    title: 'Column 3',
    cards: initialCards3,
  },
];

export const useDnDManagement = () => {
  const [columns, setColumns] = useState<ColumnType[]>(data);
  const [activeCard, setActiveCard] = useState<TodoCardProps | null>(null);

  const [isAddNewColumn, setIsAddNewColumn] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');

  const handleAddNewColumnToList = () => {
    setColumns((prevState) => {
      return [
        ...prevState,
        { title: newColumnTitle, id: newColumnTitle, cards: [] },
      ];
    });
  };

  const handleChangeNewColumnName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewColumnTitle(e.target.value);
  };

  const handleAddNewColumn = () => {
    if (!newColumnTitle.trim()) {
      handleCancelNewColumn();
      return;
    }

    handleAddNewColumnToList();
    handleCancelNewColumn();
  };

  const handleOpenNewColumn = () => {
    setIsAddNewColumn(true);
  };

  const handleCancelNewColumn = () => {
    setNewColumnTitle('');
    setIsAddNewColumn(false);
  };

  const columnMap = useMemo(() => {
    const map = new Map<string, ColumnType>();

    columns.forEach((col) => {
      map.set(col.id, col);
      col.cards.forEach((card) => map.set(card._id, col));
    });

    return map;
  }, [columns]);

  const findColumn = (id: string | null): ColumnType | null => {
    return (id && columnMap.get(id)) || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = String(event.active.id);
    const activeColumn = findColumn(activeId);

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
      columns,
      activeCard,
      sensors,
      handleDragEnd,
      handleDragOver,
      handleDragStart,
    },
    isAddNewColumn,
    newColumnTitle,
    handleOpenNewColumn,
    handleCancelNewColumn,
    handleAddNewColumn,
    handleChangeNewColumnName,
  };
};
