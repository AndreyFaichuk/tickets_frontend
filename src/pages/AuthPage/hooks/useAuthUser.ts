import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { RegisterNewUserValues } from '../components/RegistrationForm/RegistrationForm.schema';
import { AuthApi } from '../../../api/auth.api';
import { AxiosErrorResponse } from '../../../types';
import { APP_ROUTES } from '../../../constants/routes';
import { LoginFormValues } from '../../LoginPage/components/LoginForm/LoginForm.shema';

export const useAuthUser = () => {
  const navigation = useNavigate();

  const createUser = useMutation({
    mutationFn: async (newUser: RegisterNewUserValues) => {
      const response = await AuthApi.registerUser(newUser);
      return response;
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: () => {
      toast.success('You successfully logged in!');
      navigation(APP_ROUTES.DEFAULT);
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
      toast.success('You successfully logged in!');
      navigation(APP_ROUTES.DEFAULT);
    },
  });

  return {
    handleRegisterUser: createUser.mutate,
    handleLoginUser: loginUser.mutate,
  };
};
