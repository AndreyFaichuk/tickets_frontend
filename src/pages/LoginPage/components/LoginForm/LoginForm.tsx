import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {
  StyledLoginFormInputsWrapper,
  StyledLoginFormRoot,
} from './LoginForm.styled';
import { LoginFormValues, loginSchema } from './LoginForm.shema';
import { FormInput } from '../../../../components/shared/FormInput';
import { AminationWrapper } from '../../../../components/shared/AminationWrapper';

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <StyledLoginFormRoot onSubmit={submit}>
        <AminationWrapper>
          <StyledLoginFormInputsWrapper>
            <FormInput name="email" label="Email" />
            <FormInput name="password" label="Password" />
          </StyledLoginFormInputsWrapper>
        </AminationWrapper>

        <Button
          type="submit"
          fullWidth
          endIcon={<SendIcon />}
          variant="contained"
          color="secondary">
          Log in
        </Button>
      </StyledLoginFormRoot>
    </FormProvider>
  );
};
