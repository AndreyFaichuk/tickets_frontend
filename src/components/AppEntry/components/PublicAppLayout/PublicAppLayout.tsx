import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '../../../../constants/routes';
import { AuthPage } from '../../../../pages/AuthPage';
import { LoginPage } from '../../../../pages/LoginPage';
import { DefaultPublicAppLayout } from '../../../../app/DefaultPublicAppLayout';

export const PublicAppLayout = () => {
  return (
    <DefaultPublicAppLayout>
      <Routes>
        <Route path={APP_ROUTES.REGISTRATION} element={<AuthPage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.REGISTRATION} />} />
      </Routes>
    </DefaultPublicAppLayout>
  );
};
