import { z } from 'zod';

export const registeredSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name must consist of at least 1 character'),
    lastName: z
      .string()
      .min(1, 'Last name must consist of at least 1 character'),
    email: z
      .string()
      .email({ message: 'Enter a valid email.' })
      .min(1, 'This field is required.'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .trim(),
    repeatPassword: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .trim(),
    isRememberMe: z.boolean().default(false),
    country: z.string().min(1, 'Country is required!'),
    dateOfBirth: z.string().min(1, 'Date of birth is required!').date(),
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
