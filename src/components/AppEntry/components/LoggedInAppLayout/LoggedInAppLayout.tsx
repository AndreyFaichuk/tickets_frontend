import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultAppLayout } from '../../../../app/DefaultAppLayout';
import { ADD_LOGGED_IN_ROUTES } from '../../../../constants/routes';
import WorkspacesPage from '../../../../pages/WorkspacesPage/WorkspacesPage';
import TodosPage from '../../../../pages/TodosPage/TodosPage';
import EditTodoPage from '../../../../pages/EditTodoPage/EditTodoPage';

export default function LoggedInAppLayout() {
  return (
    <DefaultAppLayout>
      <Routes>
        <Route path={ADD_LOGGED_IN_ROUTES.WORKSPACES}>
          <Route index element={<WorkspacesPage />} />
          <Route path="invite" element={<WorkspacesPage />} />
        </Route>
        <Route path={ADD_LOGGED_IN_ROUTES.TODOS} element={<TodosPage />} />
        <Route
          path={ADD_LOGGED_IN_ROUTES.EDIT_TODO}
          element={<EditTodoPage />}
        />
        <Route
          path="*"
          element={<Navigate to={ADD_LOGGED_IN_ROUTES.WORKSPACES} />}
        />
      </Routes>
    </DefaultAppLayout>
  );
}
