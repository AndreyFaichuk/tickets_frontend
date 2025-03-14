import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { AminationWrapper } from '@shared/AminationWrapper';

import { REGISTRATION_FORM } from './constants';
import { REGISTRATIONS_STEPS } from './RegistrationForm.constants';
import { useRegistrationFormManagement } from './RegistrationForm.hooks';
import {
  RegisteredFormValues,
  registeredSchema,
} from './RegistrationForm.schema';
import {
  StyledRegisteredFormButtonsWrapper,
  StyledRegisteredFormRoot,
} from './RegistrationForm.styled';

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
      <StyledRegisteredFormRoot onSubmit={submit} id={REGISTRATION_FORM.root}>
        <AminationWrapper key={currentStep}>
          {steps[currentStep].render}
        </AminationWrapper>

        <StyledRegisteredFormButtonsWrapper>
          {currentStepOptions.backStep && (
            <Button
              type="button"
              variant="outlined"
              onClick={onBack}
              id={REGISTRATION_FORM.backButton}>
              Back
            </Button>
          )}
          <Button
            id={REGISTRATION_FORM.submitButton}
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
