import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultAppLayout } from '@app/DefaultAppLayout';
import { DefaultCircularLoader } from '@shared/DefaultCircularLoader/DefaultCircularLoader';

import { ADD_LOGGED_IN_ROUTES } from '../../../../constants/routes';

const LazyWorkspacesPage = lazy(
  () => import('@pages/WorkspacesPage/WorkspacesPage'),
);

const LazyTodosPage = lazy(() => import('@pages/TodosPage/TodosPage'));

const LazyEditTodoPage = lazy(() => import('@pages/EditTodoPage/EditTodoPage'));

export default function LoggedInAppLayout() {
  return (
    <DefaultAppLayout>
      <Suspense fallback={<DefaultCircularLoader />}>
        <Routes>
          <Route path={ADD_LOGGED_IN_ROUTES.WORKSPACES}>
            <Route index element={<LazyWorkspacesPage />} />
            <Route path="invite" element={<LazyWorkspacesPage />} />
          </Route>
          <Route
            path={ADD_LOGGED_IN_ROUTES.TODOS}
            element={<LazyTodosPage />}
          />
          <Route
            path={ADD_LOGGED_IN_ROUTES.EDIT_TODO}
            element={<LazyEditTodoPage />}
          />
          <Route
            path="*"
            element={<Navigate to={ADD_LOGGED_IN_ROUTES.WORKSPACES} />}
          />
        </Routes>
      </Suspense>
    </DefaultAppLayout>
  );
}
