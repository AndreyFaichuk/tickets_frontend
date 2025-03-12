import { FC } from 'react';
import { Stack } from '@mui/material';

import { FormCheckBox } from '../../../../../../components/shared/FormCheckBox';
import { FormDatePicker } from '../../../../../../components/shared/FormDatePicker';
import { FormInput } from '../../../../../../components/shared/FormInput';
import {
  FourthStepRegistrationFormInputsWrapper,
  FourthStepRegistrationFormRoot,
} from './FourthStepRegistrationForm.styled';
import { useBreakpoint } from '../../../../../../hooks/useBreakpoint';
import { REGISTRATION_FORM_NAMES } from '../../constants';

export const FourthStepRegistrationForm: FC = () => {
  const isLessThanMobile = useBreakpoint('down', 'mobile');

  return (
    <FourthStepRegistrationFormRoot id="registration-form-fourth-step_root">
      <Stack spacing={2}>
        <FormDatePicker
          label="Date of Birth"
          name={REGISTRATION_FORM_NAMES.dateOfBirth}
        />
        <FormCheckBox label="Remember Me?" name="isRememberMe" />
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
