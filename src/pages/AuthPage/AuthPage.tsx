import { Link } from 'react-router-dom';
import {
  AuthRoot,
  AuthSubTitle,
  AuthTitle,
  AuthTitleWrapper,
} from './AuthPage.styled';
import { APP_ROUTES } from '../../constants/routes';
import { RegistrationForm } from './components/RegistrationForm';
import { RegisteredFormValues } from './components/RegistrationForm/RegistrationForm.schema';

export const AuthPage = () => {
  const handleSubmit = (values: RegisteredFormValues) => {
    console.log(values, 'values 14');
  };

  return (
    <AuthRoot elevation={6}>
      <AuthTitleWrapper direction="column" gap={1} alignItems="center">
        <AuthTitle variant="h4">Create an account</AuthTitle>
        <AuthSubTitle variant="body1">
          Already have an account? <Link to={APP_ROUTES.LOGIN}>Sign in</Link>
        </AuthSubTitle>
      </AuthTitleWrapper>
      <RegistrationForm onSubmit={handleSubmit} />
    </AuthRoot>
  );
};
