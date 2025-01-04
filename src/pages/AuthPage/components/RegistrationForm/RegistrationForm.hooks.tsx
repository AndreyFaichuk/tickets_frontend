import { useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import {
  FIELDS,
  FieldsToRegistration,
  REGISTRATIONS_STEPS,
} from './RegistrationForm.constants';
import { FirstStepRegistrationForm } from './components/FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from './components/SecondStepRegistrationForm';
import { ThirdStepRegistrationForm } from './components/ThirdStepRegistrationForm';
import { FourthStepRegistrationForm } from './components/FourthStepRegistrationForm';
import { RegisteredFormValues } from './RegistrationForm.schema';

type useRegistrationFormManagementProps = {
  trigger: UseFormTrigger<RegisteredFormValues>;
};

export const useRegistrationFormManagement = ({
  trigger,
}: useRegistrationFormManagementProps) => {
  const [currentStep, setCurrentStep] = useState<FieldsToRegistration>(
    REGISTRATIONS_STEPS.firstStep,
  );

  const currentFieldOptions = FIELDS[currentStep];

  const handleNextStepForm = async () => {
    if (currentStep === REGISTRATIONS_STEPS.fourthStep) {
      return;
    }
    const isValid = await trigger(currentFieldOptions.validate);

    if (!isValid || !currentFieldOptions.nextStep) return;

    setCurrentStep(currentFieldOptions.nextStep);
  };

  const handleBack = () => {
    if (!currentFieldOptions.backStep) return;

    setCurrentStep(currentFieldOptions.backStep);
  };

  const STEPS: Record<FieldsToRegistration, { render: JSX.Element }> = {
    firstStep: { render: <FirstStepRegistrationForm /> },
    secondStep: { render: <SecondStepRegistrationForm /> },
    thirdStep: { render: <ThirdStepRegistrationForm /> },
    fourthStep: { render: <FourthStepRegistrationForm /> },
  };

  return {
    onNext: handleNextStepForm,
    onBack: handleBack,
    steps: STEPS,
    currentStep,
    currentStepOptions: currentFieldOptions,
  };
};
