import { Link } from 'react-router-dom';
import { AuthContent, AuthType, ValuesToType } from './types';
import { ADD_PUBLIC_ROUTES } from './constants/routes';

export const AUTH_CONTENT: Record<AuthType, AuthContent> = {
  registration: {
    title: 'Create an account',
    subtitle: (
      <>
        Already have an account?{' '}
        <Link to={ADD_PUBLIC_ROUTES.LOGIN}>Log in</Link>
      </>
    ),
  },
  login: {
    title: 'Log into an account',
    subtitle: (
      <>
        Do not have an account?{' '}
        <Link to={ADD_PUBLIC_ROUTES.REGISTRATION}>Sign in</Link>
      </>
    ),
  },
} as const;

export const AUTH: Record<AuthType, AuthType> = {
  login: 'login',
  registration: 'registration',
} as const;

export const PAGES_MAP = {
  dashboard: 'Dashboard1',
  settings: 'Settings',
  logout: 'Logout',
  editTodo: 'Edit Todo',
} as const;

export type Pages = ValuesToType<typeof PAGES_MAP>;

export const COOKIE_NAMES = {
  sessionId: 'sessionId',
} as const;

export const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'http://18.214.91.17:3000';
