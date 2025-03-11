import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {
  StyledRegisteredFormButtonsWrapper,
  StyledRegisteredFormRoot,
} from './RegistrationForm.styled';
import {
  RegisteredFormValues,
  registeredSchema,
} from './RegistrationForm.schema';

import { AminationWrapper } from '../../../../components/shared/AminationWrapper';

import { useRegistrationFormManagement } from './RegistrationForm.hooks';
import { REGISTRATIONS_STEPS } from './RegistrationForm.constants';

type RegistrationFormProps = {
  onSubmit: (values: RegisteredFormValues) => void;
};

export const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmit }) => {
  const methods = useForm<RegisteredFormValues>({
    resolver: zodResolver(registeredSchema),
    mode: 'onChange',
  });

  const { currentStep, onBack, onNext, steps, currentStepOptions } =
    useRegistrationFormManagement({
      trigger: methods.trigger,
    });

  const isLastStep = currentStep === REGISTRATIONS_STEPS.fourthStep;

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <StyledRegisteredFormRoot onSubmit={submit} id="registration-form">
        <AminationWrapper key={currentStep}>
          {steps[currentStep].render}
        </AminationWrapper>

        <StyledRegisteredFormButtonsWrapper>
          {currentStepOptions.backStep && (
            <Button type="button" variant="outlined" onClick={onBack}>
              Back
            </Button>
          )}
          <Button
            id="form-next_button"
            key={isLastStep ? 'finish' : 'next'}
            type={isLastStep ? 'submit' : 'button'}
            fullWidth
            onClick={isLastStep ? undefined : onNext}
            endIcon={isLastStep ? <SendIcon /> : null}
            variant="contained"
            color="secondary">
            {isLastStep ? 'Sign Up' : 'Next'}
          </Button>
        </StyledRegisteredFormButtonsWrapper>
      </StyledRegisteredFormRoot>
    </FormProvider>
  );
};
