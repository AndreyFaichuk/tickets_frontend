import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultAppLayout } from '../../../../app/DefaultAppLayout';
import { APP_ROUTES } from '../../../../constants/routes';
import { TodosPage } from '../../../../pages/TodosPage';

export const LoggedInAppLayout = () => {
  return (
    <DefaultAppLayout>
      <Routes>
        <Route path={APP_ROUTES.TODOS} element={<TodosPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.TODOS} />} />
      </Routes>
    </DefaultAppLayout>
  );
};
