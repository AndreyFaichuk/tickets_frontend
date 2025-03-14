import { PAGES_MAP } from '@constants';

import { DefaultAppPage } from '@app/DefaultAppPage';
import { useColumnsFetch } from '@hooks/columns/useColumnsFetch';
import { useWorkspaceFetchById } from '@hooks/workspaces/useWorkspaceFetchById';
import { DisplayWithLoader } from '@shared/DisplayWithLoader';

import { useAuthUserCheck } from '../AuthPage/hooks/useAuthUserCheck';
import { useCurrentWorkspaceSync } from '../WorkspacesPage/hooks/useCurrentWorkspaceSync';

import { DnDToDoProvider } from './components/DnDToDoProvider';

export default function TodosPage() {
  useCurrentWorkspaceSync();
  useAuthUserCheck();

  const { currentWorkspace, isCurrentWorkspaceLoading } =
    useWorkspaceFetchById();

  const { allColumns, areAllColumnsLoading } = useColumnsFetch();

  const isLoading = isCurrentWorkspaceLoading || areAllColumnsLoading;

  const pageTitle = isLoading
    ? PAGES_MAP.dashboard
    : `${PAGES_MAP.dashboard} for workspace ${currentWorkspace?.title || ''}`;

  return (
    <DefaultAppPage title={pageTitle}>
      <DisplayWithLoader isloading={isLoading}>
        <DnDToDoProvider data={allColumns} />
      </DisplayWithLoader>
    </DefaultAppPage>
  );
}
