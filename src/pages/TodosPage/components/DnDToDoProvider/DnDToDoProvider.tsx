import { FC, useEffect, useMemo, useRef } from 'react';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { IconButton, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { TodoCard } from '../TodoCard';
import { BaseColumn } from '../../../../components/shared/BaseColumn';
import { useDnDManagement } from './hooks/useDnDManagement';
import {
  StyledDnDToDoProviderButton,
  StyledDnDToDoProviderIconButton,
  StyledDnDToDoProviderNewColumn,
} from './DnDToDoProvider.styled';

type DnDProviderProps = {};

export const DnDToDoProvider: FC<DnDProviderProps> = () => {
  const {
    dnd: {
      activeCard,
      sensors,
      columns,
      handleDragEnd,
      handleDragOver,
      handleDragStart,
    },
    handleOpenNewColumn,
    handleCancelNewColumn,
    handleAddNewColumn,
    handleChangeNewColumnName,
    isAddNewColumn,
    newColumnTitle,
  } = useDnDManagement();

  const renderedColumns = useMemo(() => {
    return columns.map((column) => (
      <BaseColumn
        id={column.id}
        key={column.id}
        initialTodos={column.cards}
        title={column.title}
        activeCardId={activeCard?._id ?? ''}
      />
    ));
  }, [columns, activeCard]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isAddNewColumn) {
      inputRef.current.focus();
    }
  }, [isAddNewColumn]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <Stack direction="row" gap={5} pl={3} pr={3}>
        {renderedColumns}
        <StyledDnDToDoProviderButton>
          {isAddNewColumn ? (
            <StyledDnDToDoProviderNewColumn elevation={5}>
              <TextField
                value={newColumnTitle}
                variant="standard"
                onChange={(e) => handleChangeNewColumnName(e)}
                inputRef={inputRef}
              />
              <IconButton
                autoFocus
                onClick={handleAddNewColumn}
                sx={{ position: 'absolute', right: '40px', top: '76px' }}>
                <DoneIcon />
              </IconButton>
              <IconButton
                autoFocus
                onClick={handleCancelNewColumn}
                sx={{ position: 'absolute', right: '0px', top: '76px' }}>
                <CloseIcon />
              </IconButton>
            </StyledDnDToDoProviderNewColumn>
          ) : (
            <>
              <StyledDnDToDoProviderIconButton
                onClick={handleOpenNewColumn}
                type="button"
                size="large"
                color="secondary">
                <AddIcon />
              </StyledDnDToDoProviderIconButton>
            </>
          )}
        </StyledDnDToDoProviderButton>
      </Stack>
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
