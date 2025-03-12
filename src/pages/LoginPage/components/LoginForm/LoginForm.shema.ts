import { z } from 'zod';
import { LOGIN_FORM_NAMES } from './constants';

export const loginSchema = z.object({
  [LOGIN_FORM_NAMES.email]: z
    .string()
    .email({ message: 'Enter a valid email.' })
    .min(1, 'This field is required.'),
  [LOGIN_FORM_NAMES.password]: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .trim(),
  [LOGIN_FORM_NAMES.isRememberMe]: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
