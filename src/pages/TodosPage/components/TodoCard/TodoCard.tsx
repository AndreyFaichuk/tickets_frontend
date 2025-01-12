import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TodoCardRoot, TodoCardTypography } from './TodoCard.styled';
import { TodoCardPropsWithActions } from './TodoCard.types';
import { CircularProgressWithLabel } from '../CircularProgressWithLabel';
import { TodoCardActionBlock } from '../TodoCardActionBlock';
import { Box } from '@mui/material';

interface TodoCardProps extends TodoCardPropsWithActions {
  isDragging?: boolean;
  isActiveCard?: boolean;
}

export const TodoCard: FC<TodoCardProps> = ({
  _id,
  description,
  name,
  progress,
  actions,
  isDragging = false,
  isActiveCard = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: _id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TodoCardRoot elevation={isDragging ? 8 : 4} isActiveCard={isActiveCard}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '120px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'grab',
        }}
        id={_id}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}>
        <TodoCardTypography variant="h6" align="center">
          {name}
        </TodoCardTypography>
        <TodoCardTypography align="center">{description}</TodoCardTypography>
        {/* <CircularProgressWithLabel progress={progress} /> */}
      </Box>
      <TodoCardActionBlock actions={actions} currentId={_id} />
    </TodoCardRoot>
  );
};
