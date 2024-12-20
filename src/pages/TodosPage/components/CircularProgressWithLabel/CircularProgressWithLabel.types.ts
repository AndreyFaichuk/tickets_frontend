import { CircularProgressProps } from '@mui/material';

import { TodoCardProps } from '../TodoCard/TodoCard.types';

export type CircularProgressWithLabelProps = Pick<TodoCardProps, 'progress'> &
  CircularProgressProps;
