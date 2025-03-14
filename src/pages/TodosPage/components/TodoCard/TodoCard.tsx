import { FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import dayjs from 'dayjs';

import { Stack, Tooltip } from '@mui/material';

import { BaseBadgeWithTooltip } from '@shared/BaseBadgeWithTooltip';
import { DEFAULT_BADGE_VARIANTS } from '@shared/BaseBadgeWithTooltip/BaseBadgeWithTooltip.constants';
import { PRIORITY_ICON_MAP } from '@shared/ToDoForm/ToDoForm.constants';

import { CircularProgressWithLabel } from '../CircularProgressWithLabel';
import { TodoCardActionBlock } from '../TodoCardActionBlock';

import {
  TodoCardActionIconWrapper,
  TodoCardContentWrapper,
  TodoCardIconWrapper,
  TodoCardRoot,
  TodoCardTypography,
} from './TodoCard.styled';
import { TodoCardPropsWithActions } from './TodoCard.types';

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
  priority,
  attachmentsUrls,
  totalComments,
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

  const formattedDate = dayjs(created_at).format('YYYY/MM/DD');
  const attachmentsCount = attachmentsUrls.length;

  return (
    <TodoCardRoot elevation={isDragging ? 8 : 4} isActiveCard={isActiveCard}>
      <TodoCardContentWrapper
        style={style}
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
        <Tooltip title={`${priority} priority`} placement="top">
          <TodoCardIconWrapper>
            <img
              src={PRIORITY_ICON_MAP[priority]}
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          </TodoCardIconWrapper>
        </Tooltip>
        <CircularProgressWithLabel progress={progress} />
        <TodoCardActionIconWrapper flexDirection="column" gap={1}>
          <TodoCardActionBlock actions={actions} currentId={_id} />
          <Stack direction="row" gap={3} alignItems="flex-end">
            {attachmentsCount > 0 && (
              <BaseBadgeWithTooltip
                badgeVariant={DEFAULT_BADGE_VARIANTS.attachments}
                count={attachmentsCount}
              />
            )}
            {totalComments > 0 && (
              <BaseBadgeWithTooltip
                badgeVariant={DEFAULT_BADGE_VARIANTS.comments}
                count={totalComments}
              />
            )}
          </Stack>
          <TodoCardTypography variant="body2">
            {formattedDate}
          </TodoCardTypography>
        </TodoCardActionIconWrapper>
      </Stack>
    </TodoCardRoot>
  );
};
