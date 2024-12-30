import { FC } from 'react';
import { Stack } from '@mui/material';

import { FormCheckBox } from '../../../../../../components/shared/FormCheckBox';
import { FormDatePicker } from '../../../../../../components/shared/FormDatePicker';
import { FormInput } from '../../../../../../components/shared/FormInput';

export const FourthStepRegistrationForm: FC = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack>
        <FormDatePicker label="Date of birth" name="dateOfBirth" />
        <FormCheckBox label="Remember me?" name="isRememberMe" />
      </Stack>

      <Stack justifyContent="center">
        <FormInput name="password" label="Password" />
        <FormInput name="repeatPassword" label="Repeat password" />
      </Stack>
    </Stack>
  );
};
