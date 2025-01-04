import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Enter a valid email.' })
    .min(1, 'This field is required.'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .trim(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
