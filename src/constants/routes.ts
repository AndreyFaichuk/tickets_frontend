export const ADD_LOGGED_IN_ROUTES = {
  TODOS: '/app/:workspaceId/todos',
  EDIT_TODO: '/app/edit/:id',
  WORKSPACES: '/app/workspaces',
} as const;

export const ADD_PUBLIC_ROUTES = {
  REGISTRATION: '/app/registration',
  LOGIN: '/app/login',
} as const;
