import { FC, useMemo } from 'react';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { Stack } from '@mui/material';

import { TodoCard } from '../TodoCard';
import { BaseColumn } from '../../../../components/shared/BaseColumn';
import { useDnDManagement } from './hooks/useDnDManagement';
import { AddNewColumnBlock } from './components/AddNewColumnBlock';
import { StyledDnDToDoProviderRoot } from './DnDToDoProvider.styled';
import { ColumnType } from './hooks/useColumnsManagement';

type DnDProviderProps = {
  data: ColumnType[];
};

export const DnDToDoProvider: FC<DnDProviderProps> = ({ data }) => {
  const {
    dnd: { sensors, handleDragEnd, handleDragOver, handleDragStart },
    columns: { activeCard, currentColumns },
    columnsHandlers: { handleAddNewColumnToList },
  } = useDnDManagement(data);

  const renderedColumns = useMemo(() => {
    return currentColumns.map((column) => {
      const shouldShowDeleteButton = currentColumns.length > 1;

      return (
        <BaseColumn
          id={column.id}
          key={column.id}
          initialTodos={column.cards}
          title={column.title}
          activeCardId={activeCard?._id ?? ''}
          shouldShowDeleteButton={shouldShowDeleteButton}
        />
      );
    });
  }, [currentColumns, activeCard]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <StyledDnDToDoProviderRoot>
        <Stack
          direction="row"
          gap={5}
          pl={3}
          pr={3}
          sx={{
            width: 'max-content',
            minWidth: '100%',
          }}>
          {renderedColumns}
          <AddNewColumnBlock onAddNewColumnToList={handleAddNewColumnToList} />
        </Stack>
      </StyledDnDToDoProviderRoot>
      <DragOverlay
        dropAnimation={{
          duration: 400,
          easing: 'ease-out',
        }}>
        {activeCard && (
          <TodoCard
            attachmentsUrls={activeCard.attachmentsUrls}
            priority={activeCard.priority}
            created_at={activeCard.created_at}
            _id={activeCard._id}
            name={activeCard.name}
            description={activeCard.description}
            progress={activeCard.progress}
            actions={{ onDelete: () => {}, onEdit: () => {} }}
            isDragging
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
