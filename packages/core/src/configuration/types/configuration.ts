import type z from 'zod';
import type { configuration_schema } from '@/configuration/lib/schemas/configuration';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type parsed_sleetch_configuration = z.infer<typeof configuration_schema>;
export type partial_sleetch_configuration = DeepPartial<parsed_sleetch_configuration>;
