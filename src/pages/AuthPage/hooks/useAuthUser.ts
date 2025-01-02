import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RegisterNewUserValues } from '../components/RegistrationForm/RegistrationForm.schema';
import { AuthApi } from '../../../api/auth.api';

export const useAuthUser = () => {
  const createUser = useMutation({
    mutationFn: (newUser: RegisterNewUserValues) => {
      const response = AuthApi.registerUser(newUser);
      return response;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {},
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
