import { Button, Stack, Typography } from '@mui/material';

import { PAGES_MAP } from '@constants';

import { DefaultAppPage } from '@app/DefaultAppPage';
import { BaseTable } from '@shared/BaseTable';
import { DisplayWithLoader } from '@shared/DisplayWithLoader';
import { SwapButtonComponent } from '@shared/SwapButtonComponent';

import { useInviteNewMemberToWorkspace } from '../../hooks/invite/useInviteNewMemberToWorkspace';
import { useWorkspacesActions } from '../../hooks/workspaces/useWorkspacesActions';
import { useWorkspacesFetch } from '../../hooks/workspaces/useWorkspacesFetch';
import { useAuthUserCheck } from '../AuthPage/hooks/useAuthUserCheck';

import { EmptyWorkspaceBlock } from './components/EmptyWorkspaceBlock';
import { WorkspaceFilterBar } from './components/WorkspaceFilterBar/WorkspaceFilterBar';
import { useWorkspacesTableData } from './hooks/useWorkspacesTableData';
import { StyledWorkspacesPageRoot } from './WorkspacesPage.styled';
import { Workspace } from './WorkspacesPage.types';

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
