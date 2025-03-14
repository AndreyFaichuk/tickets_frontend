import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InviteApi } from '@api/invite.api';
import { ADD_LOGGED_IN_ROUTES } from '../../constants/routes';
import { workspacesQueryKeys } from '../workspaces/useWorkspacesFetch';
import { useWorkspaceStore } from '@stores/workspacesStore';

const TOAST_STYLES = {
  width: '600px',
  height: '120px',
  fontSize: '16px',
  padding: '20px',
};

export const useInviteNewMemberToWorkspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const workspaceInviteTokenAfterLogIn =
    useWorkspaceStore.workspaceInviteTokenAfterLogIn();

  const clearWorkspaceState = useWorkspaceStore.clearWorkspaceState();

  const token = queryParams.get('token') ?? workspaceInviteTokenAfterLogIn;

  const queryClient = useQueryClient();

  const handleRedirectToWorkspaces = () =>
    navigate(ADD_LOGGED_IN_ROUTES.WORKSPACES, { replace: true });

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) return;

      const response = await InviteApi.inviteNewMemberToWorkspace(token);

      return response;
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(
          `You have been successfully added to the workspace ${data.title}`,
          { style: TOAST_STYLES },
        );

        queryClient.invalidateQueries({
          queryKey: workspacesQueryKeys.workspaces.all(),
        });

        handleRedirectToWorkspaces();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }

      handleRedirectToWorkspaces();
    },
    onSettled: () => {
      clearWorkspaceState();
    },
  });

  useEffect(() => {
    if (token) {
      mutate();
    }
  }, [token, mutate]);
};
