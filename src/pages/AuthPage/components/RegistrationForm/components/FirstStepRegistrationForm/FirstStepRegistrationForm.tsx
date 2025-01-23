import { FC } from 'react';

import { FormInput } from '../../../../../../components/shared/FormInput';
import { StyledRegisteredFormInputsWrapper } from '../../RegistrationForm.styled';

export const FirstStepRegistrationForm: FC = () => {
  return (
    <StyledRegisteredFormInputsWrapper>
      <FormInput name="firstName" label="First name" fullWidth />
      <FormInput name="lastName" label="Last name" fullWidth />
    </StyledRegisteredFormInputsWrapper>
  );
};
