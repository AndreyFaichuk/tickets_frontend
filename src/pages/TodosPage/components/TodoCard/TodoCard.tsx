import { FC } from 'react';

import { TodoCardRoot, TodoCardTypography } from './TodoCard.styled';
import { TodoCardPropsWithActions } from './TodoCard.types';
import { CircularProgressWithLabel } from '../CircularProgressWithLabel';
import { TodoCardActionBlock } from '../TodoCardActionBlock';

export const TodoCard: FC<TodoCardPropsWithActions> = ({
  _id,
  description,
  name,
  progress,
  actions,
}) => {
  return (
    <TodoCardRoot elevation={4}>
      <TodoCardTypography variant="h6" align="center">
        {name}
      </TodoCardTypography>
      <TodoCardTypography align="center">{description}</TodoCardTypography>
      <CircularProgressWithLabel progress={progress} />
      <TodoCardActionBlock actions={actions} currentId={_id} />
    </TodoCardRoot>
  );
};
