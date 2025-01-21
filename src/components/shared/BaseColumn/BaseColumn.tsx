import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { SwapComponents } from '../SwapComponents/SwapComponents';
import { useColumnActions } from '../../../hooks/columns/useColumnsActions';
import { Input } from '../Input';

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
  const navigate = useNavigate();
  const { handleUpdateColumn } = useColumnActions();

  const { setNodeRef } = useDroppable({ id: id });

  const [columnTitle, setColumnTitle] = useState<string>(title);

  const {
    activeModals,
    modalsList,
    handlers: { openModal, onActiveTodoId },
  } = useBaseColumnManagement({
    columnTitle: title,
    columnId: id,
  });

  const handleResetNewColumntitle = () => {
    setColumnTitle(title);
  };

  const handleChangeNewColumnName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setColumnTitle(e.target.value);
  };

  const handleSubmitChangeColumnTitle = () => {
    handleUpdateColumn({
      columnForUpdate: { title: columnTitle },
      columnId: id,
    });
  };

  return (
    <Stack direction="column" gap={1} position="relative">
      <SwapComponents
        shouldCallAfterClickOutside={handleResetNewColumntitle}
        shouldCallAfterApprove={handleSubmitChangeColumnTitle}
        render={({ shouldSwap, handleSwap }) =>
          shouldSwap ? (
            <Input
              autoFocusOnMount
              value={columnTitle}
              variant="standard"
              onChange={handleChangeNewColumnName}
            />
          ) : (
            <Typography onClick={handleSwap} variant="h6">
              {title}
            </Typography>
          )
        }
      />
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
      {activeModals.deleteTodo && modalsList.deleteTodo.render}
    </Stack>
  );
};
