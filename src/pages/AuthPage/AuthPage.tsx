import { RegistrationForm } from './components/RegistrationForm';
import { RegisteredFormValues } from './components/RegistrationForm/RegistrationForm.schema';
import { useAuthUser } from './hooks/useAuthUser';
import { DefaultAuthLayout } from '../../app/DefaultAuthLayout';
import { AUTH, AUTH_CONTENT } from '../../constants';

export const AuthPage = () => {
  const { handleRegisterUser } = useAuthUser();

  if (import.meta.env.MODE === 'development') {
    console.log('dev!3434554364563');
  } else {
    console.log('prod! 999999');
  }

  const handleSubmit = (values: RegisteredFormValues) => {
    const { repeatPassword, ...valuesWithoutRepeatPassword } = values;

    handleRegisterUser(valuesWithoutRepeatPassword);
  };

  return (
    <DefaultAuthLayout
      subTitle={AUTH_CONTENT[AUTH.registration].subtitle}
      title={AUTH_CONTENT[AUTH.registration].title}>
      <RegistrationForm onSubmit={handleSubmit} />
    </DefaultAuthLayout>
  );
};
