import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosErrorResponse } from '@types';
import { toast } from 'react-toastify';

import { AuthApi } from '@api/auth.api';
import { workspacesQueryKeys } from '@hooks/workspaces/useWorkspacesFetch';

import { ADD_LOGGED_IN_ROUTES } from '../../../constants/routes';
import { usersQueryKeys } from '../../../hooks/user/useGetCurrentUser';
import { LoginFormValues } from '../../LoginPage/components/LoginForm/LoginForm.shema';
import { RegisterNewUserValues } from '../components/RegistrationForm/RegistrationForm.schema';

import { authQueryKeys } from './useAuthUserCheck';

export const useAuthUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const successHandler = () => {
    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.user.current(),
    });
    queryClient.invalidateQueries({
      queryKey: workspacesQueryKeys.workspaces.all(),
    });
    queryClient.invalidateQueries({ queryKey: authQueryKeys.auth });

    toast.success('You successfully logged in!');
    navigate(ADD_LOGGED_IN_ROUTES.WORKSPACES);
  };

  const createUser = useMutation({
    mutationFn: async (newUser: RegisterNewUserValues) => {
      const response = await AuthApi.registerUser(newUser);
      return response;
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: () => {
      successHandler();
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
      successHandler();
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      const response = await AuthApi.logoutUser();
      return response;
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.auth });
    },
  });

  return {
    handleRegisterUser: createUser.mutate,
    handleLoginUser: loginUser.mutate,
    handleLogout: logoutUser.mutate,
  };
};
