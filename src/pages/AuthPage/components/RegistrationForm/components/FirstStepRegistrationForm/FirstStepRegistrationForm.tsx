import { FC } from 'react';

import { FormInput } from '../../../../../../components/shared/FormInput';
import { StyledRegisteredFormInputsWrapper } from '../../RegistrationForm.styled';

export const FirstStepRegistrationForm: FC = () => {
  return (
    <StyledRegisteredFormInputsWrapper id="registration-form-first-step_root">
      <FormInput name="firstName" label="First name" fullWidth />
      <FormInput name="lastName" label="Last name" fullWidth />
    </StyledRegisteredFormInputsWrapper>
  );
};
