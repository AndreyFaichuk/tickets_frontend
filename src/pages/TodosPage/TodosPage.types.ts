export type ValuesToType<T> = T[keyof T];

export const CURRENT_MODE = {
  view: 'view',
  delete: 'delete',
} as const;

export type ToDoMode = ValuesToType<typeof CURRENT_MODE>;

export type CurrentToDoType = {
  currentId: string;
  mode: ToDoMode;
};
