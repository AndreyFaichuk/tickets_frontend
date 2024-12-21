import { TodoCardActionBlockProps } from '../TodoCardActionBlock/TodoCardActionBlock.types';

export type TodoCardProps = {
  name: string;
  description: string;
  progress: number;
  _id: string;
};

export type TodoCardPropsWithActions = TodoCardProps & {
  actions: TodoCardActionBlockProps;
};
