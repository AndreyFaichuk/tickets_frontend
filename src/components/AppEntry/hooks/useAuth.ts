import { useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ADD_LOGGED_IN_ROUTES,
  ADD_PUBLIC_ROUTES,
} from '../../../constants/routes';
import { COOKIE_NAMES } from '../../../constants';

const PUBLIC_ROUTES = Object.keys(ADD_PUBLIC_ROUTES);

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies, _, removeCookie] = useCookies([COOKIE_NAMES.sessionId]);

  const isAuthenticated = Boolean(cookies[COOKIE_NAMES.sessionId]);

  useEffect(() => {
    if (isAuthenticated && PUBLIC_ROUTES.includes(location.pathname)) {
      navigate(ADD_LOGGED_IN_ROUTES.TODOS, { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleLogout = useCallback(() => {
    removeCookie(COOKIE_NAMES.sessionId, { path: '/' });
    navigate(ADD_PUBLIC_ROUTES.LOGIN, { replace: true });
  }, [navigate, removeCookie]);

  return { isAuthenticated, handleLogout };
};
