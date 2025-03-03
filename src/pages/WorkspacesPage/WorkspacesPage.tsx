import { FC } from 'react';
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

export const WorkspacesPage: FC = () => {
  useInviteNewMemberToWorkspace();

  const { allWorkspaces, allWorkspacesLoading } = useWorkspacesFetch();
  const { createWorkspace } = useWorkspacesActions();

  const handleSubmitCreateWorkspace = (title: string) => {
    createWorkspace({
      title,
    });
  };

  const columns = useWorkspacesTableData();

  const getContent = () => {
    if (!allWorkspaces.length)
      return (
        <EmptyWorkspaceBlock onCreateWorkspace={handleSubmitCreateWorkspace} />
      );

    return (
      <Stack gap={2} alignItems="flex-start">
        <SwapButtonComponent onApprove={handleSubmitCreateWorkspace}>
          {(handleSwap) => (
            <Button variant="contained" color="success" onClick={handleSwap}>
              New workspace
            </Button>
          )}
        </SwapButtonComponent>
        <BaseTable<Workspace> columns={columns} data={allWorkspaces} />
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
};
