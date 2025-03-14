import { useQuery } from '@tanstack/react-query';
import { PaginatedData } from '@types';

import { WorkspaceApi } from '@api/workspace.api';
import { Workspace } from '@pages/WorkspacesPage/WorkspacesPage.types';
import { getNormalizeWorkspaces } from '@pages/WorkspacesPage/WorkspacesPage.utils';
import { useWorkspaceStore } from '@stores/workspacesStore';
import { PerPage, SortOption } from '@stores/workspacesStore/constants';

const WORKSPACES_KEY = 'workspaces' as const;
const ALL_KEY = 'all' as const;
const ONE_KEY = 'one' as const;

export const workspacesQueryKeys = {
  workspaces: {
    all: () => [WORKSPACES_KEY, ALL_KEY],
    page: (
      page: string,
      perPage: PerPage,
      search: string,
      sort: SortOption,
      amICreator: boolean,
    ) => [WORKSPACES_KEY, ALL_KEY, page, perPage, search, sort, amICreator],
    one: (id: string) => [WORKSPACES_KEY, ONE_KEY, id],
  },
};

export const useWorkspacesFetch = () => {
  const currentPage = useWorkspaceStore.currentPage();
  const currentPerPage = useWorkspaceStore.currentPerPage();
  const search = useWorkspaceStore.search();
  const sort = useWorkspaceStore.sort();
  const amICreator = useWorkspaceStore.amICreator();

  const { data: allWorkspaces, isLoading } = useQuery<
    PaginatedData<Workspace[]>
  >({
    queryKey: workspacesQueryKeys.workspaces.page(
      currentPage,
      currentPerPage,
      search,
      sort,
      amICreator,
    ),
    queryFn: async () => {
      const response = await WorkspaceApi.getWorkspaces({
        currentPage,
        currentPerPage,
        search,
        sort,
        amICreator,
      });

      return {
        content: getNormalizeWorkspaces(response.content),
        pagination: response.pagination,
      };
    },
    staleTime: 1000 * 60,
    retry: false,
  });

  return { allWorkspaces, allWorkspacesLoading: isLoading };
};
