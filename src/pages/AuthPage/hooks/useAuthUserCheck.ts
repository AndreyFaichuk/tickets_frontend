import { useQuery } from '@tanstack/react-query';
import { AuthApi } from '../../../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { ADD_PUBLIC_ROUTES } from '../../../constants/routes';

export type AuthUserCheckResponse = {
  isAuthenticated: boolean;
};

export const authQueryKeys = {
  auth: ['auth'],
};

export const useAuthUserCheck = () => {
  const navigate = useNavigate();

  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: authQueryKeys.auth,
    queryFn: async () => {
      try {
        const response = await AuthApi.checkAuth();
        return response?.isAuthenticated ?? false;
      } catch (error) {
        navigate(ADD_PUBLIC_ROUTES.LOGIN, { replace: true });
        return false;
      }
    },
    retry: false,
  });

  return { isAuthenticated, isLoading };
};
