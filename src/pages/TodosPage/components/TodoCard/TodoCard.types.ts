import { TodoCardActionBlockProps } from '../TodoCardActionBlock/TodoCardActionBlock.types';

export type TodoCardProps = {
  name: string;
  description: string;
  progress: number;
  _id: string;
  created_at: Date;
};

export type TodoCardForCreate = Omit<TodoCardProps, '_id' | 'created_at'>;

export type TodoCardPropsWithActions = TodoCardProps & {
  actions: TodoCardActionBlockProps;
};
