import { ValuesToType } from '@types';

export const CURRENT_DND_COLUMN_INITIAL_STATE = {
  fromColumnId: 'fromColumnId',
  toColumnId: 'toColumnId',
  todoId: 'todoId',
  fromTodoIndex: 'fromTodoIndex',
  toTodoIndex: 'toTodoIndex',
} as const;

export type CurrentDnDColumnStateType = ValuesToType<
  typeof CURRENT_DND_COLUMN_INITIAL_STATE
>;

export type CurrentDnDColumnType = {
  [key in CurrentDnDColumnStateType]: string | number;
};

export type CurrentDnDColumnState = Partial<
  Record<CurrentDnDColumnStateType, string | number>
>;
