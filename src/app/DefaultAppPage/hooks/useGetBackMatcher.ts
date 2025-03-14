import { useCallback, useMemo } from 'react';

import { useLocation, useNavigate, matchPath } from 'react-router-dom';

import { ADD_LOGGED_IN_ROUTES } from '../../../constants/routes';

const pageMap: Record<string, string> = {
  Dashboard: ADD_LOGGED_IN_ROUTES.EDIT_TODO,
  Workspaces: ADD_LOGGED_IN_ROUTES.TODOS,
};

export const useGetBackMatcher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = useMemo(() => {
    const pageKey = (Object.keys(pageMap) as (keyof typeof pageMap)[]).find(
      (key) => matchPath(pageMap[key], location.pathname),
    );

    return pageKey;
  }, [location.pathname]);

  const handleGoBack = useCallback(() => {
    if (currentPage && matchPath(pageMap[currentPage], location.pathname)) {
      navigate(-1);
    }
  }, [navigate, location.pathname, currentPage]);

  return {
    currentPage,
    handleGoBack,
  };
};
