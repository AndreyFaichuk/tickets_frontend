import { useEffect, useCallback } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuthUser } from '@pages/AuthPage/hooks/useAuthUser';
import { useAuthUserCheck } from '@pages/AuthPage/hooks/useAuthUserCheck';
import { useCurrentWorkspaceSync } from '@pages/WorkspacesPage/hooks/useCurrentWorkspaceSync';
import { useWorkspaceStore } from '@stores/workspacesStore';

import {
  ADD_LOGGED_IN_ROUTES,
  ADD_PUBLIC_ROUTES,
} from '../../../constants/routes';

const PUBLIC_ROUTES = Object.keys(ADD_PUBLIC_ROUTES);

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleRemoveWorkspaceIdFromLocalStorage } = useCurrentWorkspaceSync();

  const clearWorkspaceState = useWorkspaceStore.clearWorkspaceState();

  const { isAuthenticated, isLoading } = useAuthUserCheck();
  const { handleLogout } = useAuthUser();

  useEffect(() => {
    if (isAuthenticated && PUBLIC_ROUTES.includes(location.pathname)) {
      navigate(ADD_LOGGED_IN_ROUTES.WORKSPACES, { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleUserLogout = useCallback(() => {
    clearWorkspaceState();
    handleRemoveWorkspaceIdFromLocalStorage();
    handleLogout();
  }, []);

  return { isAuthenticated, handleUserLogout, isLoading };
};
