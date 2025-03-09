import { FC, ReactNode } from 'react';
import { Button, Stack } from '@mui/material';
import { SwapButtonComponent } from '../../../../components/shared/SwapButtonComponent';
import { InputDebouncedValue } from '../../../../components/shared/InputDebouncedValue';
import { PaginatorWithPerPage } from '../PaginatorWithPerPage';
import { useWorkspaceStore } from '../../../../stores/workspacesStore';
import { useWorkspacesActions } from '../../../../hooks/workspaces/useWorkspacesActions';
import { useWorkspacesFetch } from '../../../../hooks/workspaces/useWorkspacesFetch';

type WorkspaceFilterBarProps = {
  shouldHidePaginator: boolean;
  children: ReactNode;
};

export const WorkspaceFilterBar: FC<WorkspaceFilterBarProps> = ({
  children,
  shouldHidePaginator,
}) => {
  const { allWorkspaces } = useWorkspacesFetch();

  const setSearch = useWorkspaceStore.setSearch();
  const search = useWorkspaceStore.search();
  const currentPerPage = useWorkspaceStore.currentPerPage();
  const setCurrentPage = useWorkspaceStore.setCurrentPage();
  const setCurrentPerPage = useWorkspaceStore.setCurrentPerPage();

  const { createWorkspace } = useWorkspacesActions();

  const handleSubmitCreateWorkspace = (title: string) => {
    createWorkspace({
      title,
    });
  };

  const handlePaginatorChange = (
    _: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page.toString());
  };

  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2} alignItems="center">
        <SwapButtonComponent onApprove={handleSubmitCreateWorkspace}>
          {(handleSwap) => (
            <Button variant="contained" color="success" onClick={handleSwap}>
              New workspace
            </Button>
          )}
        </SwapButtonComponent>
        <InputDebouncedValue
          value={search}
          setSearch={setSearch}
          label="Search by title"
        />
      </Stack>
      {children}
      {!shouldHidePaginator && (
        <PaginatorWithPerPage
          currentPage={allWorkspaces?.pagination.currentPage ?? 1}
          currentPerPage={currentPerPage}
          onPaginatorChange={handlePaginatorChange}
          setCurrentPerPage={setCurrentPerPage}
          totalPages={allWorkspaces?.pagination.totalPages ?? 1}
        />
      )}
    </Stack>
  );
};
