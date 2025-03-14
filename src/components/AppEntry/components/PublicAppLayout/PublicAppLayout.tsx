import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { DefaultPublicAppLayout } from '@app/DefaultPublicAppLayout';
import AuthPage from '@pages/AuthPage/AuthPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import { useWorkspaceStore } from '@stores/workspacesStore';

import { ADD_PUBLIC_ROUTES } from '../../../../constants/routes';

export default function PublicAppLayout() {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token');

  const setWorkspaceInviteTokenAfterLogIn =
    useWorkspaceStore.setWorkspaceInviteTokenAfterLogIn();

  if (token) {
    setWorkspaceInviteTokenAfterLogIn(token);
  }

  return (
    <DefaultPublicAppLayout>
      <Routes>
        <Route path={ADD_PUBLIC_ROUTES.REGISTRATION} element={<AuthPage />} />
        <Route path={ADD_PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path="*"
          element={<Navigate to={ADD_PUBLIC_ROUTES.REGISTRATION} />}
        />
      </Routes>
    </DefaultPublicAppLayout>
  );
}
