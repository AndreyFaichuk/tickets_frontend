import { useEffect } from 'react';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosErrorResponse } from '@types';
import { toast } from 'react-toastify';

import { UserApi } from '@api/user.api';
import { User } from '@app/DefaultUserMenu/DefaultUserMenu.types';
import { useAuth } from '@components/AppEntry/hooks/useAuth';

export const usersQueryKeys = {
  user: {
    all: () => ['users', 'all'],
    one: (id: string) => ['user', 'one', id],
    current: () => ['user', 'current'],
  },
};

export const useGetCurrentUser = () => {
  const { handleUserLogout } = useAuth();

  const {
    data: currentUser,
    isLoading,
    failureReason,
  }: UseQueryResult<User, AxiosErrorResponse> = useQuery({
    queryKey: usersQueryKeys.user.current(),
    queryFn: async () => {
      return await UserApi.getCurrentUser();
    },

    retry: false,
    staleTime: 1000 * 60 * 10, // 10 min
  });

  useEffect(() => {
    if (failureReason && failureReason.response) {
      toast.error(failureReason.response.data.message);
      handleUserLogout();
    }
  }, [failureReason, handleUserLogout]);

  return {
    currentUser: currentUser ?? ({} as User),
    isCurrentUserLoading: isLoading,
  };
};
