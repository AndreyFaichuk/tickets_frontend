import { z } from 'zod';

export const todoSchema = z.object({
  name: z.string().min(1, 'Name must consist of at least 1 character'),
  description: z
    .string()
    .nonempty('Description is required')
    .refine((val) => val.trim().length > 0, {
      message: 'Description cannot be just spaces',
    }),
  progress: z
    .number()
    .min(0, 'Progress must be at least 0')
    .max(100, 'Progress cannot exceed 100'),
});

export type TodoValues = z.infer<typeof todoSchema>;
