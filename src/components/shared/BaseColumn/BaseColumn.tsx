import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { StyledBaseColumnRoot } from './BaseColumn.styled';
import { TodoCard } from '../../../pages/TodosPage/components/TodoCard';
import { TodoCardProps } from '../../../pages/TodosPage/components/TodoCard/TodoCard.types';

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
      </StyledBaseColumnRoot>
    </Stack>
  );
};
