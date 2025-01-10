import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import CloseIcon from '@mui/icons-material/Close';

import {
  StyledBaseColumnAddToDoButton,
  StyledBaseColumnRoot,
  StyledCloseIconButton,
} from './BaseColumn.styled';
import { TodoCard } from '../../../pages/TodosPage/components/TodoCard';
import { TodoCardProps } from '../../../pages/TodosPage/components/TodoCard/TodoCard.types';

import { BASE_COLUMN_MODAL_TYPES } from './BaseColumn.constants';
import { useBaseColumnManagement } from './hooks/useBaseColumnManagement';

type BaseColumn = {
  initialTodos: TodoCardProps[];
  id: string;
  title: string;
  activeCardId: string;
};

export const BaseColumn: FC<BaseColumn> = ({
  initialTodos,
  id,
  title,
  activeCardId,
}) => {
  const { setNodeRef } = useDroppable({ id: id });

  const {
    activeModals,
    modalsList,
    handlers: { openModal },
  } = useBaseColumnManagement({
    columnTitle: title,
    columnId: id,
  });

  return (
    <Stack direction="column" gap={1}>
      <Typography variant="h6">{title}</Typography>
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
                isActiveCard={activeCardId === card._id}
                key={card._id}
                _id={card._id}
                description={card.description}
                name={card.name}
                progress={card.progress}
                actions={{
                  onDelete: () => {},
                  onEdit: () => {},
                }}
              />
            ))}
          </Stack>
        </SortableContext>
        <StyledCloseIconButton
          className="childClass"
          onClick={() => openModal(BASE_COLUMN_MODAL_TYPES.confirmation)}>
          <CloseIcon />
        </StyledCloseIconButton>
        <StyledBaseColumnAddToDoButton
          onClick={() => openModal(BASE_COLUMN_MODAL_TYPES.createTodo)}
          type="button"
          color="info"
          variant="contained"
          fullWidth>
          Add todo
        </StyledBaseColumnAddToDoButton>
      </StyledBaseColumnRoot>

      {activeModals.createTodo && modalsList.createTodo.render}
      {activeModals.confirmation && modalsList.confirmation.render}
    </Stack>
  );
};
