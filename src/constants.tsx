import { Link } from 'react-router-dom';
import { AuthContent, AuthType } from './types';
import { APP_ROUTES } from './constants/routes';

export const AUTH_CONTENT: Record<AuthType, AuthContent> = {
  registration: {
    title: 'Create an account',
    subtitle: (
      <>
        Already have an account? <Link to={APP_ROUTES.LOGIN}>Log in</Link>
      </>
    ),
  },
  login: {
    title: 'Log into an account',
    subtitle: (
      <>
        Do not have an account?{' '}
        <Link to={APP_ROUTES.REGISTRATION}>Sign in</Link>
      </>
    ),
  },
};

export const AUTH: Record<AuthType, AuthType> = {
  login: 'login',
  registration: 'registration',
};
