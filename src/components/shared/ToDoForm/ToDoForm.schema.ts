import { z } from 'zod';

import { ALLOWED_FILE_TYPES_MAP, PRIORITY_VARIANT } from './ToDoForm.constants';

const fileSizeLimit = 1024 * 1024; // 1MB

const fileTypesMap = Object.keys(ALLOWED_FILE_TYPES_MAP);
const fileTypes = Object.values(ALLOWED_FILE_TYPES_MAP);

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
  priority: z.enum(
    [PRIORITY_VARIANT.low, PRIORITY_VARIANT.middle, PRIORITY_VARIANT.high],
    {
      errorMap: () => ({
        message: 'Priority must be one of: low, middle, high',
      }),
    },
  ),
  attachments: z
    .union([z.instanceof(FileList), z.array(z.instanceof(File))])
    .optional()
    .transform((list) => (list ? Array.from(list) : []))
    .refine((files) => files.every((file) => fileTypes.includes(file.type)), {
      message: `Invalid file type. Allowed types: ${fileTypesMap.join(', ')}`,
    })
    .refine((files) => files.every((file) => file.size <= fileSizeLimit), {
      message: 'File size should not exceed 1MB',
    })
    .refine((files) => files.length <= 5, {
      message: 'Maximum 5 files allowed',
    }),
});

export type TodoValues = z.infer<typeof todoSchema>;
