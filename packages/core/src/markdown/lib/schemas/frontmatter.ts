import z from 'zod';
import { available_engines, } from '@/configuration/lib/schemas/markdown/engine';

export const page_frontmatter_schema = z.object({
  title: z.string().default('No title.'),
  description: z.string().default('No description.'),
  engine: z.enum(available_engines).optional(),
  order: z.number().optional(),
  icon: z.string().optional(),
});

export const category_frontmatter_schema = z.object({
  title: z.string().default('No title.'),
  icon: z.string().optional(),
  order: z.number().optional(),
});
