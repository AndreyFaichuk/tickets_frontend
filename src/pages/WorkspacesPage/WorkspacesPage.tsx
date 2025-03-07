import { Button, Stack } from '@mui/material';
import { StyledWorkspacesPageRoot } from './WorkspacesPage.styled';
import { DisplayWithLoader } from '../../components/shared/DisplayWithLoader';
import { PAGES_MAP } from '../../constants';
import { BaseTable } from '../../components/shared/BaseTable';

import { useWorkspacesFetch } from '../../hooks/workspaces/useWorkspacesFetch';
import { EmptyWorkspaceBlock } from './components/EmptyWorkspaceBlock';
import { useWorkspacesTableData } from './hooks/useWorkspacesTableData';
import { Workspace } from './WorkspacesPage.types';
import { DefaultAppPage } from '../../app/DefaultAppPage';
import { useWorkspacesActions } from '../../hooks/workspaces/useWorkspacesActions';
import { SwapButtonComponent } from '../../components/shared/SwapButtonComponent';
import { useInviteNewMemberToWorkspace } from '../../hooks/invite/useInviteNewMemberToWorkspace';
import { useAuthUserCheck } from '../AuthPage/hooks/useAuthUserCheck';
import { useWorkspaceStore } from '../../stores/workspacesStore';
import { PaginatorWithPerPage } from './components/PaginatorWithPerPage';
import { InputDebouncedValue } from '../../components/shared/InputDebouncedValue';

export default function WorkspacesPage() {
  useInviteNewMemberToWorkspace();
  useAuthUserCheck();

  const { allWorkspaces, allWorkspacesLoading } = useWorkspacesFetch();

  const currentPerPage = useWorkspaceStore.currentPerPage();
  const setCurrentPage = useWorkspaceStore.setCurrentPage();
  const setCurrentPerPage = useWorkspaceStore.setCurrentPerPage();
  const setSearch = useWorkspaceStore.setSearch();
  const search = useWorkspaceStore.search();

  const { createWorkspace } = useWorkspacesActions();

  const { workspaces, pagination } = allWorkspaces;

  const handleSubmitCreateWorkspace = (title: string) => {
    createWorkspace({
      title,
    });
  };

  const columns = useWorkspacesTableData();

  const handlePaginatorChange = (
    _: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page.toString());
  };

  const getContent = () => {
    if (!workspaces.length)
      return (
        <EmptyWorkspaceBlock onCreateWorkspace={handleSubmitCreateWorkspace} />
      );

    return (
      <Stack gap={2} alignItems="flex-start">
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
        <BaseTable<Workspace> columns={columns} data={workspaces} />
        <PaginatorWithPerPage
          currentPage={pagination.currentPage}
          currentPerPage={currentPerPage}
          onPaginatorChange={handlePaginatorChange}
          setCurrentPerPage={setCurrentPerPage}
          totalPages={pagination.totalPages}
        />
      </Stack>
    );
  };

  return (
    <DefaultAppPage title={PAGES_MAP.workspaces}>
      <DisplayWithLoader isloading={allWorkspacesLoading}>
        <StyledWorkspacesPageRoot alignItems="center">
          {getContent()}
        </StyledWorkspacesPageRoot>
      </DisplayWithLoader>
    </DefaultAppPage>
  );
}
