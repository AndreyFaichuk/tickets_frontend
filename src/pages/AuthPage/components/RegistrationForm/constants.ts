import { DEFAULT_FORM_ELEMENTS } from '@constants';
import { FormCompositeNames, ValuesToType } from '@types';

export const REGISTRATION_FORM = {
  root: 'registration-form',
  submitButton: 'registration-form_submit',
  backButton: 'registration-form_back',
} as const;

export const REGISTRATION_FORM_NAMES = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  country: 'country',
  dateOfBirth: 'dateOfBirth',
  password: 'password',
  repeatPassword: 'repeatPassword',
  isRememberMe: 'isRememberMe',
} as const;

export type RegistrationFormNames = ValuesToType<
  typeof REGISTRATION_FORM_NAMES
>;

export const LOGIN_FORM_COMPOSITE_NAMES: FormCompositeNames<RegistrationFormNames> =
  {
    firstName: `form-${DEFAULT_FORM_ELEMENTS.input}_${REGISTRATION_FORM_NAMES.firstName}`,
    lastName: `form-${DEFAULT_FORM_ELEMENTS.input}_${REGISTRATION_FORM_NAMES.lastName}`,
    email: `form-${DEFAULT_FORM_ELEMENTS.input}_${REGISTRATION_FORM_NAMES.email}`,
    country: `form-${DEFAULT_FORM_ELEMENTS.selectWithSearch}_${REGISTRATION_FORM_NAMES.country}`,
    dateOfBirth: `form-${DEFAULT_FORM_ELEMENTS.dateCalendar}_${REGISTRATION_FORM_NAMES.dateOfBirth}`,
    password: `form-${DEFAULT_FORM_ELEMENTS.input}_${REGISTRATION_FORM_NAMES.password}`,
    repeatPassword: `form-${DEFAULT_FORM_ELEMENTS.input}_${REGISTRATION_FORM_NAMES.repeatPassword}`,
    isRememberMe: `form-${DEFAULT_FORM_ELEMENTS.checkbox}_${REGISTRATION_FORM_NAMES.isRememberMe}`,
  } as const;
