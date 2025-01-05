import { Navigate, Route, Routes } from 'react-router-dom';

import { ADD_PUBLIC_ROUTES } from '../../../../constants/routes';
import { AuthPage } from '../../../../pages/AuthPage';
import { LoginPage } from '../../../../pages/LoginPage';
import { DefaultPublicAppLayout } from '../../../../app/DefaultPublicAppLayout';

export const PublicAppLayout = () => {
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
};
