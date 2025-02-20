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

export const FourthStepRegistrationForm: FC = () => {
  const isLessThanMobile = useBreakpoint('down', 'mobile');

  return (
    <>
      <FourthStepRegistrationFormRoot>
        <Stack spacing={2}>
          <FormDatePicker label="Date of Birth" name="dateOfBirth" />
          <FormCheckBox label="Remember Me?" name="isRememberMe" />
        </Stack>

        <FourthStepRegistrationFormInputsWrapper>
          <FormInput
            name="password"
            label="Password"
            type="password"
            fullWidth={isLessThanMobile ? true : false}
          />
          <FormInput
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            fullWidth={isLessThanMobile ? true : false}
          />
        </FourthStepRegistrationFormInputsWrapper>
      </FourthStepRegistrationFormRoot>
    </>
  );
};
