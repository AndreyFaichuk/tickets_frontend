import { z } from 'zod';

export const registeredSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name must consist of at least 1 character'),
  lastName: z.string().min(1, 'Last name must consist of at least 1 character'),
  password: z.string().min(1, 'Name must consist of at least 1 character'),
  email: z.string(),
  repeatPassword: z
    .string()
    .min(1, 'Name must consist of at least 1 character'),
  isRememberMe: z.boolean().default(false),
  country: z.string(),
  dateOfBirth: z.string(),
});

export type RegisteredFormValues = z.infer<typeof registeredSchema>;
