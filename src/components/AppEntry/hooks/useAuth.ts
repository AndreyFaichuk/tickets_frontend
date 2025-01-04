import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const useAuth = () => {
  const [cookies, removeCookie] = useCookies(['user_id']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookies.user_id) {
      setIsAuthenticated(true);

      return;
    }
    setIsAuthenticated(false);
  }, [cookies]);

  return { isAuthenticated, handleRemoveCookie: removeCookie };
};
