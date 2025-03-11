import { Button, Stack, Typography } from '@mui/material';
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
import { useInviteNewMemberToWorkspace } from '../../hooks/invite/useInviteNewMemberToWorkspace';
import { useAuthUserCheck } from '../AuthPage/hooks/useAuthUserCheck';
import { WorkspaceFilterBar } from './components/WorkspaceFilterBar/WorkspaceFilterBar';
import { SwapButtonComponent } from '../../components/shared/SwapButtonComponent';

export default function WorkspacesPage() {
  useInviteNewMemberToWorkspace();
  useAuthUserCheck();

  const { allWorkspaces, allWorkspacesLoading } = useWorkspacesFetch();

  const { createWorkspace } = useWorkspacesActions();

  const handleSubmitCreateWorkspace = (title: string) => {
    createWorkspace({
      title,
    });
  };

  const columns = useWorkspacesTableData();

  const isLoading =
    allWorkspacesLoading ||
    !allWorkspaces?.content ||
    !allWorkspaces?.pagination;

  const emptyWorkspaces =
    !allWorkspaces?.pagination.totalItems &&
    !allWorkspaces?.pagination.totalPages;

  const getContent = () => {
    if (!isLoading && emptyWorkspaces) {
      return <Typography variant="h5">There are no workspaces</Typography>;
    }

    if (!isLoading && !allWorkspaces?.content.length) {
      return (
        <EmptyWorkspaceBlock onCreateWorkspace={handleSubmitCreateWorkspace} />
      );
    }

    return (
      <BaseTable<Workspace>
        columns={columns}
        data={allWorkspaces?.content ?? []}
      />
    );
  };

  return (
    <DefaultAppPage title={PAGES_MAP.workspaces}>
      <Stack gap={1}>
        <Stack direction="row" alignItems="center">
          <SwapButtonComponent onApprove={handleSubmitCreateWorkspace}>
            {(handleSwap) => (
              <Button variant="contained" color="success" onClick={handleSwap}>
                New workspace
              </Button>
            )}
          </SwapButtonComponent>
        </Stack>
        <WorkspaceFilterBar />
        <DisplayWithLoader isloading={isLoading}>
          <StyledWorkspacesPageRoot alignItems="center">
            <Stack gap={2} alignItems="flex-start">
              {getContent()}
            </Stack>
          </StyledWorkspacesPageRoot>
        </DisplayWithLoader>
      </Stack>
    </DefaultAppPage>
  );
}
