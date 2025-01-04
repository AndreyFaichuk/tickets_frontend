import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '../../../../constants/routes';
import { DefaultAppLayout } from '../../../../app/DefaultAppLayout';
import { AuthPage } from '../../../../pages/AuthPage';
import { LoginPage } from '../../../../pages/LoginPage';

export const PublicAppLayout = () => {
  return (
    <DefaultAppLayout isAuthorized={false}>
      <Routes>
        <Route path={APP_ROUTES.REGISTRATION} element={<AuthPage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.REGISTRATION} />} />
      </Routes>
    </DefaultAppLayout>
  );
};
