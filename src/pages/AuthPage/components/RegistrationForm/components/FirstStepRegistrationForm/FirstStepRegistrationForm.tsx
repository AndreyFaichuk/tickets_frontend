import { FC } from 'react';

import { FormInput } from '../../../../../../components/shared/FormInput';
import { StyledRegisteredFormInputsWrapper } from '../../RegistrationForm.styled';
import { REGISTRATION_FORM_NAMES } from '../../constants';

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
