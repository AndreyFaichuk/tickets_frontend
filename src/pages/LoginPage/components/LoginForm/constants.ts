import { DEFAULT_FORM_ELEMENTS } from '@constants';
import { FormCompositeNames, ValuesToType } from '@types';

export const LOGIN_FORM = {
  root: 'login-form',
  submitButton: 'form-login_submit',
} as const;

export const LOGIN_FORM_NAMES = {
  email: 'email',
  password: 'password',
  isRememberMe: 'isRememberMe',
} as const;

export type LoginFormNames = ValuesToType<typeof LOGIN_FORM_NAMES>;

export const LOGIN_FORM_COMPOSITE_NAMES: FormCompositeNames<LoginFormNames> = {
  email: `form-${DEFAULT_FORM_ELEMENTS.input}_${LOGIN_FORM_NAMES.email}`,
  password: `form-${DEFAULT_FORM_ELEMENTS.input}_${LOGIN_FORM_NAMES.password}`,
  isRememberMe: `form-${DEFAULT_FORM_ELEMENTS.checkbox}_${LOGIN_FORM_NAMES.isRememberMe}`,
} as const;
