import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';

import {
  TodoCardContentWrapper,
  TodoCardRoot,
  TodoCardTypography,
} from './TodoCard.styled';
import { TodoCardPropsWithActions } from './TodoCard.types';
import { CircularProgressWithLabel } from '../CircularProgressWithLabel';
import { TodoCardActionBlock } from '../TodoCardActionBlock';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

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
  created_at,
  isDragging = false,
  isActiveCard = false,
}) => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: _id,
  });

  const formattedDate = dayjs(created_at).format('YYYY/MM/DD');

  return (
    <TodoCardRoot elevation={isDragging ? 8 : 4} isActiveCard={isActiveCard}>
      <TodoCardContentWrapper
        id={_id}
        ref={setNodeRef}
        {...listeners}
        {...attributes}>
        <TodoCardTypography variant="h6">{name}</TodoCardTypography>
        <TodoCardTypography variant="body2">{description}</TodoCardTypography>
      </TodoCardContentWrapper>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between">
        <CircularProgressWithLabel progress={progress} />
        <Stack flexDirection="column" alignItems="flex-end">
          <TodoCardActionBlock actions={actions} currentId={_id} />
          <TodoCardTypography variant="body2">
            {formattedDate}
          </TodoCardTypography>
        </Stack>
      </Stack>
    </TodoCardRoot>
  );
};
