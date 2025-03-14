import { FC } from 'react';

import { Stack } from '@mui/material';

import { FormCheckBox } from '@shared/FormCheckBox';
import { FormDatePicker } from '@shared/FormDatePicker';
import { FormInput } from '@shared/FormInput';

import { useBreakpoint } from '../../../../../../hooks/useBreakpoint';
import { REGISTRATION_FORM_NAMES } from '../../constants';

import {
  FourthStepRegistrationFormInputsWrapper,
  FourthStepRegistrationFormRoot,
} from './FourthStepRegistrationForm.styled';

export const FourthStepRegistrationForm: FC = () => {
  const isLessThanMobile = useBreakpoint('down', 'mobile');

  return (
    <FourthStepRegistrationFormRoot>
      <Stack spacing={2}>
        <FormDatePicker
          label="Date of Birth"
          name={REGISTRATION_FORM_NAMES.dateOfBirth}
        />
        <FormCheckBox
          label="Remember Me?"
          name={REGISTRATION_FORM_NAMES.isRememberMe}
        />
      </Stack>

      <FourthStepRegistrationFormInputsWrapper>
        <FormInput
          name={REGISTRATION_FORM_NAMES.password}
          label="Password"
          type="password"
          fullWidth={isLessThanMobile ? true : false}
        />
        <FormInput
          name={REGISTRATION_FORM_NAMES.repeatPassword}
          label="Repeat Password"
          type="password"
          fullWidth={isLessThanMobile ? true : false}
        />
      </FourthStepRegistrationFormInputsWrapper>
    </FourthStepRegistrationFormRoot>
  );
};
