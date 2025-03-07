import { PAGES_MAP } from '../../constants';

import { DnDToDoProvider } from './components/DnDToDoProvider';
import { DisplayWithLoader } from '../../components/shared/DisplayWithLoader';
import { useColumnsFetch } from '../../hooks/columns/useColumnsFetch';
import { useWorkspaceFetchById } from '../../hooks/workspaces/useWorkspaceFetchById';
import { DefaultAppPage } from '../../app/DefaultAppPage';
import { useCurrentWorkspaceSync } from '../WorkspacesPage/hooks/useCurrentWorkspaceSync';
import { useAuthUserCheck } from '../AuthPage/hooks/useAuthUserCheck';

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
