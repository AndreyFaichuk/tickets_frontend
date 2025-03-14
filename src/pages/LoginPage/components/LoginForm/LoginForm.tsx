import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { AminationWrapper } from '@shared/AminationWrapper';
import { FormCheckBox } from '@shared/FormCheckBox';
import { FormInput } from '@shared/FormInput';

import { LOGIN_FORM, LOGIN_FORM_NAMES } from './constants';
import { LoginFormValues, loginSchema } from './LoginForm.shema';
import {
  StyledLoginFormInputsWrapper,
  StyledLoginFormRoot,
} from './LoginForm.styled';

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
      <StyledLoginFormRoot onSubmit={submit} id={LOGIN_FORM.root}>
        <AminationWrapper>
          <StyledLoginFormInputsWrapper>
            <FormInput name={LOGIN_FORM_NAMES.email} label="Email" fullWidth />
            <FormInput
              name={LOGIN_FORM_NAMES.password}
              label="Password"
              type="password"
              fullWidth
            />
          </StyledLoginFormInputsWrapper>
          <FormCheckBox
            label="Remember Me?"
            name={LOGIN_FORM_NAMES.isRememberMe}
          />
        </AminationWrapper>

        <Button
          id={LOGIN_FORM.submitButton}
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
