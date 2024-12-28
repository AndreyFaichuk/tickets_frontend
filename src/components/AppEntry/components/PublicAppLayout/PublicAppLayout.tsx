import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '../../../../constants/routes';
import { DefaultAppLayout } from '../../../../app/DefaultAppLayout';
import { AuthPage } from '../../../../pages/AuthPage';

export const PublicAppLayout = () => {
  return (
    <DefaultAppLayout shouldShowDrawer={false} shouldShowHeader={false}>
      <Routes>
        <Route path={APP_ROUTES.AUTH} element={<AuthPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.AUTH} />} />
      </Routes>
    </DefaultAppLayout>
  );
};
