import { DefaultAuthLayout } from '../../app/DefaultAuthLayout';
import { AUTH, AUTH_CONTENT } from '../../constants';
import { useAuthUser } from '../AuthPage/hooks/useAuthUser';
import { LoginForm } from './components/LoginForm';
import { LoginFormValues } from './components/LoginForm/LoginForm.shema';

export const LoginPage = () => {
  const { handleLoginUser } = useAuthUser();

  const handleSubmit = (values: LoginFormValues) => {
    handleLoginUser(values);
  };

  return (
    <DefaultAuthLayout
      subTitle={AUTH_CONTENT[AUTH.login].subtitle}
      title={AUTH_CONTENT[AUTH.login].title}>
      <LoginForm onSubmit={handleSubmit} />
    </DefaultAuthLayout>
  );
};
