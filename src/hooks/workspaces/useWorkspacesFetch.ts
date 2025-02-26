import { useQuery } from '@tanstack/react-query';

import { WorkspaceApi } from '../../api/workspace.api';
import { getNormalizeWorkspaces } from '../../pages/WorkspacesPage/WorkspacesPage.utils';

export const workspacesQueryKeys = {
  workspaces: {
    all: () => ['workspaces', 'all'],
    one: (id: string) => ['workspace', 'one', id],
  },
};

export const useWorkspacesFetch = () => {
  const { data: allWorkspaces, isLoading } = useQuery({
    queryKey: workspacesQueryKeys.workspaces.all(),
    queryFn: async () => {
      const response = await WorkspaceApi.getWorkspaces();
      const normalizedWorkspaces = getNormalizeWorkspaces(response.data);

      return normalizedWorkspaces;
    },
    staleTime: 1000 * 60,
    retry: false,
  });

  return {
    allWorkspaces: allWorkspaces ?? [],
    allWorkspacesLoading: isLoading,
  };
};
