import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RegisterNewUserValues } from '../components/RegistrationForm/RegistrationForm.schema';
import { AuthApi } from '../../../api/auth.api';
import { AxiosErrorResponse } from '../../../types';
import { APP_ROUTES } from '../../../constants/routes';

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

  // const loginUser = useMutation({
  //   mutationFn: async (toDo: TodoCardProps) => {
  //     const response = await TodoApi.updateTodo(toDo);
  //     return response;
  //   },
  //   onError: (error: Error) => {
  //     toast.error(error.message);
  //   },
  //   onSuccess: () => {
  //     toast('ToDo has been updated!');

  //     queryClient.invalidateQueries({
  //       queryKey: todosQueryKeys.todos.all(),
  //     });
  //   },
  // });

  return {
    handleRegisterUser: createUser.mutate,
  };
};
