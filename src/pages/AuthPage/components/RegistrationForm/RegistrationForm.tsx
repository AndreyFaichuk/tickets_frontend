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

  const submit = methods.handleSubmit(
    (data) => {
      console.log('Form submitted successfully:', data);
      onSubmit(data);
    },
    (errors) => {
      console.error('Validation errors:', errors);
    },
  );

  const getActionButton = () => {
    if (currentStep === REGISTRATIONS_STEPS.fourthStep) {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={!methods.formState.isValid}>
          Sign Up
        </Button>
      );
    }

    return (
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onNext}
        endIcon={<SendIcon />}>
        Next
      </Button>
    );
  };

  return (
    <FormProvider {...methods}>
      <StyledRegisteredFormRoot onSubmit={submit}>
        <AminationWrapper key={currentStep}>
          {steps[currentStep].render}
        </AminationWrapper>

        <StyledRegisteredFormButtonsWrapper>
          {currentStepOptions.backStep && (
            <Button type="button" variant="outlined" onClick={onBack}>
              Back
            </Button>
          )}
          {getActionButton()}
        </StyledRegisteredFormButtonsWrapper>
      </StyledRegisteredFormRoot>
    </FormProvider>
  );
};
