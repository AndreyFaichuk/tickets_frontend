import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { workspacesQueryKeys } from './useWorkspacesFetch';
import { WorkspaceApi } from '@api/workspace.api';
import { ADD_LOGGED_IN_ROUTES } from '../../constants/routes';
import { useWorkspaceStore } from '@stores/workspacesStore';

export const useWorkspaceFetchById = () => {
  const navigate = useNavigate();

  const currentWorkspaceId = useWorkspaceStore.currentWorkspaceId();

  const { data: currentWorkspace, isLoading: isCurrentWorkspaceLoading } =
    useQuery({
      queryKey: workspacesQueryKeys.workspaces.one(currentWorkspaceId),
      queryFn: async () => {
        try {
          const response = await WorkspaceApi.getWorkspace(currentWorkspaceId);
          return response.data;
        } catch (error) {
          toast.error('Workspace does not exist!');
          navigate(ADD_LOGGED_IN_ROUTES.WORKSPACES);
          return null;
        }
      },
      enabled: Boolean(currentWorkspaceId),
    });

  return {
    currentWorkspace,
    isCurrentWorkspaceLoading,
  };
};
