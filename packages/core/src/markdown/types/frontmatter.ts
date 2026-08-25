import type z from 'zod';
import type { category_frontmatter_schema, page_frontmatter_schema } from '../lib/schemas/frontmatter';

export type page_frontmatter = z.infer<typeof page_frontmatter_schema>;
export type category_frontmatter = z.infer<typeof category_frontmatter_schema>;
