import type z from 'zod';

import type { source_schema } from '../lib/schemas/sources';

export type source = z.infer<typeof source_schema>;
