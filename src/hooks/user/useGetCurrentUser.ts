import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UserApi } from '../../api/user.api';
import { AxiosErrorResponse } from '../../types';
import { useAuth } from '../../components/AppEntry/hooks/useAuth';
import { User } from '../../app/DefaultUserMenu/DefaultUserMenu.types';

export const usersQueryKeys = {
  user: {
    all: () => ['users', 'all'],
    one: (id: string) => ['users', 'one', id],
    current: () => ['users', 'current'],
  },
};

export const useGetCurrentUser = () => {
  const { handleLogout } = useAuth();

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
  });

  useEffect(() => {
    if (failureReason && failureReason.response) {
      toast.error(failureReason.response.data.message);
      handleLogout();
    }
  }, [failureReason]);

  return {
    currentUser: currentUser ?? ({} as User),
    isCurrentUserLoading: isLoading,
  };
};
