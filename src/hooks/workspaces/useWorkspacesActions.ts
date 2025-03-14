import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { WorkspaceApi } from '@api/workspace.api';

import { workspacesQueryKeys } from './useWorkspacesFetch';

export type CreateWorkspaceValues = {
  title: string;
};

export type UpdateWorkspaceValues = CreateWorkspaceValues & {
  workspaceId: string;
};

export const useWorkspacesActions = () => {
  const queryClient = useQueryClient();

  const createWorkspace = useMutation({
    mutationFn: async (workspaceValues: CreateWorkspaceValues) => {
      const response = await WorkspaceApi.createWorkspace(workspaceValues);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspacesQueryKeys.workspaces.all(),
      });
    },
  });

  const updateWorkspace = useMutation({
    mutationFn: async (workspaceValues: UpdateWorkspaceValues) => {
      const response = await WorkspaceApi.updateWorkspace(workspaceValues);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspacesQueryKeys.workspaces.all(),
      });
    },
  });

  return {
    createWorkspace: createWorkspace.mutate,
    updateWorkspace: updateWorkspace.mutate,
  };
};
