import { ValuesToType } from '@types';

export const BASE_COLUMN_MODAL_TYPES = {
  createTodo: 'createTodo',
  deleteColumn: 'deleteColumn',
  deleteTodo: 'deleteTodo',
} as const;

export type BaseColumnModalTypes = ValuesToType<typeof BASE_COLUMN_MODAL_TYPES>;
export type BaseColumnModalState = { [key in BaseColumnModalTypes]: boolean };
