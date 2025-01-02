import { useMemo, useState, useCallback } from 'react';
import {
  FIELDS,
  FieldsToRegistration,
  REGISTRATIONS_STEPS,
} from './RegistrationForm.constants';
import { FirstStepRegistrationForm } from './components/FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from './components/SecondStepRegistrationForm';
import { ThirdStepRegistrationForm } from './components/ThirdStepRegistrationForm';
import { FourthStepRegistrationForm } from './components/FourthStepRegistrationForm';
import { UseFormTrigger } from 'react-hook-form';
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

  const currentFieldOptions = useMemo(() => FIELDS[currentStep], [currentStep]);

  const handleNextStepForm = useCallback(async () => {
    const isValid = await trigger(currentFieldOptions.validate);
    console.log(29);

    if (!isValid || !currentFieldOptions.nextStep) return;

    setCurrentStep(currentFieldOptions.nextStep);
  }, [currentFieldOptions]);

  const handleBack = useCallback(() => {
    if (!currentFieldOptions.backStep) return;

    setCurrentStep(currentFieldOptions.backStep);
  }, [currentFieldOptions]);

  const STEPS: Record<FieldsToRegistration, { render: JSX.Element }> =
    useMemo(() => {
      return {
        firstStep: { render: <FirstStepRegistrationForm /> },
        secondStep: { render: <SecondStepRegistrationForm /> },
        thirdStep: { render: <ThirdStepRegistrationForm /> },
        fourthStep: { render: <FourthStepRegistrationForm /> },
      };
    }, []);

  return {
    onNext: handleNextStepForm,
    onBack: handleBack,
    steps: STEPS,
    currentStep,
    currentStepOptions: currentFieldOptions,
  };
};
