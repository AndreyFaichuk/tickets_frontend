import { FC, useMemo } from 'react';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { Stack } from '@mui/material';

import { TodoCard } from '../TodoCard';
import { BaseColumn } from '../../../../components/shared/BaseColumn';
import { useDnDManagement } from './hooks/useDnDManagement';
import { AddNewColumnBlock } from './components/AddNewColumnBlock';
import { StyledDnDToDoProviderRoot } from './DnDToDoProvider.styled';

type DnDProviderProps = {};

export const DnDToDoProvider: FC<DnDProviderProps> = () => {
  const {
    dnd: { sensors, handleDragEnd, handleDragOver, handleDragStart },
    columns: { activeCard, currentColumns, isAddNewColumn, newColumnTitle },
    columnsHandlers: {
      handleAddNewColumn,
      handleCancelNewColumn,
      handleChangeNewColumnName,
      handleOpenNewColumn,
    },
  } = useDnDManagement();

  const renderedColumns = useMemo(() => {
    return currentColumns.map((column) => (
      <BaseColumn
        id={column.id}
        key={column.id}
        initialTodos={column.cards}
        title={column.title}
        activeCardId={activeCard?._id ?? ''}
      />
    ));
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
            whiteSpace: 'nowrap',
          }}>
          {renderedColumns}
          <AddNewColumnBlock
            isAddNewColumn={isAddNewColumn}
            newColumnTitle={newColumnTitle}
            onAddNewColumn={handleAddNewColumn}
            onCancelNewColumn={handleCancelNewColumn}
            onChangeNewColumnName={handleChangeNewColumnName}
            onOpenNewColumn={handleOpenNewColumn}
          />
        </Stack>
      </StyledDnDToDoProviderRoot>
      <DragOverlay
        dropAnimation={{
          duration: 400,
          easing: 'ease-out',
        }}>
        {activeCard && (
          <TodoCard
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
