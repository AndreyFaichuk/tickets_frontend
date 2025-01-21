import { FC } from 'react';
import { Stack } from '@mui/material';

import { FormCheckBox } from '../../../../../../components/shared/FormCheckBox';
import { FormDatePicker } from '../../../../../../components/shared/FormDatePicker';
import { FormInput } from '../../../../../../components/shared/FormInput';

export const FourthStepRegistrationForm: FC = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack spacing={2}>
          <FormDatePicker label="Date of Birth" name="dateOfBirth" />
          <FormCheckBox label="Remember Me?" name="isRememberMe" />
        </Stack>

        <Stack
          justifyContent="center"
          direction="column"
          sx={{ minWidth: { xs: '100%', sm: '250px' } }}
          spacing={2}
        >
          <FormInput name="password" label="Password" type="password" />
          <FormInput
            name="repeatPassword"
            label="Repeat Password"
            type="password"
          />
        </Stack>
      </Stack>
    </>
  );
};
