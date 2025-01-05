import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultAppLayout } from '../../../../app/DefaultAppLayout';
import { ADD_LOGGED_IN_ROUTES } from '../../../../constants/routes';
import { TodosPage } from '../../../../pages/TodosPage';
import { EditTodoPage } from '../../../../pages/EditTodoPage';

export const LoggedInAppLayout = () => {
  return (
    <DefaultAppLayout>
      <Routes>
        <Route path={ADD_LOGGED_IN_ROUTES.TODOS} element={<TodosPage />} />
        <Route
          path={ADD_LOGGED_IN_ROUTES.EDIT_TODO}
          element={<EditTodoPage />}
        />
        <Route
          path="*"
          element={<Navigate to={ADD_LOGGED_IN_ROUTES.TODOS} />}
        />
      </Routes>
    </DefaultAppLayout>
  );
};
