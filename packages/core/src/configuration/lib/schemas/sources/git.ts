import z from 'zod';

export const git_schema = z.object({
  type: z.literal('git'),
  language: z.string().optional(),
  repository: z.string(),
  path: z.string(),
});
