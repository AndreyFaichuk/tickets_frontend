import { AUTH, AUTH_CONTENT } from '@constants';

import { DefaultAuthLayout } from '@app/DefaultAuthLayout';

import { RegistrationForm } from './components/RegistrationForm';
import { RegisteredFormValues } from './components/RegistrationForm/RegistrationForm.schema';
import { useAuthUser } from './hooks/useAuthUser';

export default function AuthPage() {
  const { handleRegisterUser } = useAuthUser();

  const handleSubmit = (values: RegisteredFormValues) => {
    const { repeatPassword, ...valuesWithoutRepeatPassword } = values;

    handleRegisterUser(valuesWithoutRepeatPassword);
  };

  console.log(
    import.meta.env.VITE_BASE_BACKEND_URL,
    'import.meta.env.VITE_BASE_BACKEND_URL',
  );

  return (
    <DefaultAuthLayout
      subTitle={AUTH_CONTENT[AUTH.registration].subtitle}
      title={AUTH_CONTENT[AUTH.registration].title}>
      <RegistrationForm onSubmit={handleSubmit} />
    </DefaultAuthLayout>
  );
}
