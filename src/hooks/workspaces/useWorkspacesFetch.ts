import { useQuery } from '@tanstack/react-query';

import { WorkspaceApi } from '../../api/workspace.api';
import { getNormalizeWorkspaces } from '../../pages/WorkspacesPage/WorkspacesPage.utils';
import { useWorkspaceStore } from '../../stores/workspacesStore';
import { PerPage } from '../../stores/workspacesStore/constants';

const WORKSPACES_KEY = 'workspaces' as const;
const ALL_KEY = 'all' as const;
const ONE_KEY = 'one' as const;

export const workspacesQueryKeys = {
  workspaces: {
    all: () => [WORKSPACES_KEY, ALL_KEY],
    page: (page: string, perPage: PerPage, search: string) => [
      WORKSPACES_KEY,
      ALL_KEY,
      page,
      perPage,
      search,
    ],
    one: (id: string) => [WORKSPACES_KEY, ONE_KEY, id],
  },
};

export const useWorkspacesFetch = () => {
  const currentPage = useWorkspaceStore.currentPage();
  const currentPerPage = useWorkspaceStore.currentPerPage();
  const search = useWorkspaceStore.search();

  const {
    data: allWorkspaces = {
      workspaces: [],
      pagination: { totalItems: 0, totalPages: 0, currentPage: 1 },
    },
    isLoading,
  } = useQuery({
    queryKey: workspacesQueryKeys.workspaces.page(
      currentPage,
      currentPerPage,
      search,
    ),
    queryFn: async () => {
      const response = await WorkspaceApi.getWorkspaces({
        currentPage,
        currentPerPage,
        search,
      });

      return {
        workspaces: getNormalizeWorkspaces(response.content),
        pagination: response.pagination,
      };
    },
    staleTime: 1000 * 60,
    retry: false,
  });

  return { allWorkspaces, allWorkspacesLoading: isLoading };
};
