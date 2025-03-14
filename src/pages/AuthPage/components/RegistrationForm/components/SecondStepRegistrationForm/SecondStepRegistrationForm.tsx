import { FC } from 'react';

import { FormInput } from '@shared/FormInput';

import { REGISTRATION_FORM_NAMES } from '../../constants';

export const SecondStepRegistrationForm: FC = () => {
  return (
    <FormInput name={REGISTRATION_FORM_NAMES.email} label="Email" fullWidth />
  );
};
