import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, Stack, Typography } from '@mui/material';

import { TodoCard } from '@pages/TodosPage/components/TodoCard';
import { TodoCardProps } from '@pages/TodosPage/components/TodoCard/TodoCard.types';

import { useColumnActions } from '../../../hooks/columns/useColumnsActions';
import { SwapButtonComponent } from '../SwapButtonComponent';

import { BASE_COLUMN_MODAL_TYPES } from './BaseColumn.constants';
import {
  StyledBaseColumnAddToDoButton,
  StyledBaseColumnRoot,
  StyledCloseIconButton,
} from './BaseColumn.styled';
import { useBaseColumnManagement } from './hooks/useBaseColumnManagement';

type BaseColumn = {
  initialTodos: TodoCardProps[];
  id: string;
  title: string;
  activeCardId: string;
  shouldShowDeleteButton: boolean;
};

export const BaseColumn: FC<BaseColumn> = ({
  initialTodos,
  id,
  title,
  activeCardId,
  shouldShowDeleteButton,
}) => {
  const navigate = useNavigate();
  const { handleUpdateColumn } = useColumnActions();

  const { setNodeRef } = useDroppable({ id: id });

  const {
    activeModals,
    modalsList,
    handlers: { openModal, onActiveTodoId },
    isCreatingNewToDo,
  } = useBaseColumnManagement({
    columnTitle: title,
    columnId: id,
  });

  const handleSubmitChangeColumnTitle = (title: string) => {
    handleUpdateColumn({
      columnForUpdate: { title },
      columnId: id,
    });
  };

  return (
    <Stack direction="column" gap={1} position="relative">
      <SwapButtonComponent
        initialValue={title}
        onApprove={handleSubmitChangeColumnTitle}>
        {(handleSwap) => (
          <Typography onClick={handleSwap} variant="h6">
            {title}
          </Typography>
        )}
      </SwapButtonComponent>

      <StyledBaseColumnRoot elevation={5}>
        <SortableContext
          id={id}
          items={initialTodos.map((todo) => todo._id)}
          strategy={rectSortingStrategy}>
          <Stack
            ref={setNodeRef}
            direction="column"
            gap={2}
            alignItems="center">
            {initialTodos.map((card) => (
              <TodoCard
                totalComments={card.totalComments}
                attachmentsUrls={card.attachmentsUrls}
                priority={card.priority}
                created_at={card.created_at}
                isActiveCard={activeCardId === card._id}
                key={card._id}
                _id={card._id}
                description={card.description}
                name={card.name}
                progress={card.progress}
                actions={{
                  onDelete: () => {
                    onActiveTodoId(card._id);
                    openModal(BASE_COLUMN_MODAL_TYPES.deleteTodo);
                  },
                  onEdit: () => {
                    navigate(`/app/edit/${card._id}`);
                  },
                }}
                columnId=""
              />
            ))}
            {isCreatingNewToDo && (
              <CircularProgress
                size="150px"
                color="secondary"
                thickness={1.6}
              />
            )}
          </Stack>
        </SortableContext>
        {shouldShowDeleteButton && (
          <StyledCloseIconButton
            className="childClass"
            onClick={() => openModal(BASE_COLUMN_MODAL_TYPES.deleteColumn)}>
            <CloseIcon />
          </StyledCloseIconButton>
        )}
        {!isCreatingNewToDo && (
          <StyledBaseColumnAddToDoButton
            onClick={() => openModal(BASE_COLUMN_MODAL_TYPES.createTodo)}
            type="button"
            color="info"
            variant="contained"
            fullWidth>
            Add todo
          </StyledBaseColumnAddToDoButton>
        )}
      </StyledBaseColumnRoot>

      {activeModals.createTodo && modalsList.createTodo.render}
      {activeModals.deleteColumn && modalsList.deleteColumn.render}
      {activeModals.deleteTodo && modalsList.deleteTodo.render}
    </Stack>
  );
};
