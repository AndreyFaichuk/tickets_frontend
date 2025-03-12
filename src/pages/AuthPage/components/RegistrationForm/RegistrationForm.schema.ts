import { z } from 'zod';
import { REGISTRATION_FORM_NAMES } from './constants';

export const registeredSchema = z
  .object({
    [REGISTRATION_FORM_NAMES.firstName]: z
      .string()
      .min(1, 'First name must consist of at least 1 character')
      .trim(),
    [REGISTRATION_FORM_NAMES.lastName]: z
      .string()
      .min(1, 'Last name must consist of at least 1 character')
      .trim(),
    [REGISTRATION_FORM_NAMES.email]: z
      .string()
      .email({ message: 'Enter a valid email.' })
      .min(1, 'This field is required.')
      .trim(),
    [REGISTRATION_FORM_NAMES.password]: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .trim(),
    [REGISTRATION_FORM_NAMES.repeatPassword]: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .trim(),
    [REGISTRATION_FORM_NAMES.isRememberMe]: z.boolean().default(false),
    [REGISTRATION_FORM_NAMES.country]: z
      .string()
      .min(1, 'Country is required!'),
    [REGISTRATION_FORM_NAMES.dateOfBirth]: z
      .string()
      .min(1, 'Date of birth is required!')
      .date(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type RegisteredFormValues = z.infer<typeof registeredSchema>;

export type RegisterNewUserValues = Omit<
  RegisteredFormValues,
  'repeatPassword'
>;
