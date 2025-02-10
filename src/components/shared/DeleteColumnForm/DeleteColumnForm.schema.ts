import { z } from 'zod';

export const deleteColumnSchema = z.object({
  moveToDosToColumnId: z.string().min(1, 'New column is required!'),
});

export type DeleteColumnValues = z.infer<typeof deleteColumnSchema>;
