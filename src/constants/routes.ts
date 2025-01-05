export const ADD_LOGGED_IN_ROUTES = {
  TODOS: '/app/todos',
  EDIT_TODO: '/app/edit/:id',
} as const;

export const ADD_PUBLIC_ROUTES = {
  REGISTRATION: '/app/registration',
  LOGIN: '/app/login',
} as const;
