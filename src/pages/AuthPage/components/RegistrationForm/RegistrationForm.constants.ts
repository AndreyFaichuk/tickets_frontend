import { RegisteredFormValues } from './RegistrationForm.schema';

export const REGISTRATIONS_STEPS: Record<
  FieldsToRegistration,
  FieldsToRegistration
> = {
  firstStep: 'firstStep',
  secondStep: 'secondStep',
  thirdStep: 'thirdStep',
  fourthStep: 'fourthStep',
};

export type FieldsToRegistration =
  | 'firstStep'
  | 'secondStep'
  | 'thirdStep'
  | 'fourthStep';

export type FieldsToRegistrationSteps = Array<keyof RegisteredFormValues>;

type FieldsData = {
  validate: FieldsToRegistrationSteps;
  nextStep: FieldsToRegistration | null;
  backStep: FieldsToRegistration | null;
};

export const FIELDS: Record<FieldsToRegistration, FieldsData> = {
  firstStep: {
    validate: ['firstName', 'lastName'],
    nextStep: REGISTRATIONS_STEPS.secondStep,
    backStep: null,
  },
  secondStep: {
    validate: ['email'],
    nextStep: REGISTRATIONS_STEPS.thirdStep,
    backStep: REGISTRATIONS_STEPS.firstStep,
  },
  thirdStep: {
    validate: ['country'],
    nextStep: REGISTRATIONS_STEPS.fourthStep,
    backStep: REGISTRATIONS_STEPS.secondStep,
  },
  fourthStep: {
    validate: ['dateOfBirth', 'isRememberMe', 'password', 'repeatPassword'],
    nextStep: null,
    backStep: REGISTRATIONS_STEPS.thirdStep,
  },
};
