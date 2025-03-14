import { FC } from 'react';

import { FormInput } from '@shared/FormInput';

import { REGISTRATION_FORM_NAMES } from '../../constants';
import { StyledRegisteredFormInputsWrapper } from '../../RegistrationForm.styled';

export const FirstStepRegistrationForm: FC = () => {
  return (
    <StyledRegisteredFormInputsWrapper id="registration-form-first-step_root">
      <FormInput
        name={REGISTRATION_FORM_NAMES.firstName}
        label="First name"
        fullWidth
      />
      <FormInput
        name={REGISTRATION_FORM_NAMES.lastName}
        label="Last name"
        fullWidth
      />
    </StyledRegisteredFormInputsWrapper>
  );
};
