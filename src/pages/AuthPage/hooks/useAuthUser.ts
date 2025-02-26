import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { RegisterNewUserValues } from '../components/RegistrationForm/RegistrationForm.schema';
import { AuthApi } from '../../../api/auth.api';
import { AxiosErrorResponse } from '../../../types';
import { ADD_LOGGED_IN_ROUTES } from '../../../constants/routes';
import { LoginFormValues } from '../../LoginPage/components/LoginForm/LoginForm.shema';
import { usersQueryKeys } from '../../../hooks/user/useGetCurrentUser';

export const useAuthUser = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: async (newUser: RegisterNewUserValues) => {
      const response = await AuthApi.registerUser(newUser);
      return response;
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.user.current(),
      });
      toast.success('You successfully logged in!');
      navigation(ADD_LOGGED_IN_ROUTES.WORKSPACES);
    },
  });

  const loginUser = useMutation({
    mutationFn: async (user: LoginFormValues) => {
      const response = await AuthApi.loginUser(user);
      return response;
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.user.current(),
      });
      toast.success('You successfully logged in!');
      navigation(ADD_LOGGED_IN_ROUTES.WORKSPACES);
    },
  });

  return {
    handleRegisterUser: createUser.mutate,
    handleLoginUser: loginUser.mutate,
  };
};
