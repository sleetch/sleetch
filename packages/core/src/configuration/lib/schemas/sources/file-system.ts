import z from 'zod';

export const file_system_schema = z.object({
  type: z.literal('file-system'),
  language: z.string().optional(),
  path: z.string(),
});
