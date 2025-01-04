import { useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/routes';

const USER_SESSION_COOKIE = 'user_id';
const PUBLIC_ROUTES = [APP_ROUTES.LOGIN, APP_ROUTES.REGISTRATION];

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies, _, removeCookie] = useCookies([USER_SESSION_COOKIE]);

  const isAuthenticated = Boolean(cookies[USER_SESSION_COOKIE]);

  useEffect(() => {
    if (isAuthenticated && PUBLIC_ROUTES.includes(location.pathname)) {
      navigate(APP_ROUTES.TODOS, { replace: true });
    }
  }, [isAuthenticated, location.pathname]);

  const handleLogout = useCallback(() => {
    removeCookie(USER_SESSION_COOKIE, { path: '/' });
    navigate(APP_ROUTES.LOGIN, { replace: true });
  }, []);

  return { isAuthenticated, handleLogout };
};
