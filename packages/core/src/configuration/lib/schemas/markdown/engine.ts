import z from 'zod';
import { is_bun } from '../../constants';

export const available_engines = ['sleetch', 'bun', 'marked', 'markdown-it', 'mdx-js'] as const;
export const engine_schema = z
  .enum(available_engines)
  .default('sleetch')
  .refine((value) => {
    if (value === 'bun' && !is_bun)
      throw new Error('You are not currently using Bun as your runtime. Therefore, you cannot use its Markdown engine.');
    if (value === 'bun' && is_bun) {
      const [major, minor, patch] = Bun.version.split('.').map(Number);
      const is_bun_greater_than_1_3_8 = major > 1 || (major === 1 && minor > 3) || (major === 1 && minor === 3 && patch >= 8);
      if (!is_bun_greater_than_1_3_8) {
        throw new Error(
          'Bun integrated its Markdown module starting with version 1.3.8; your version of Bun is not recent enough to use this feature, so please update Bun.'
        );
      }
    }
    return value;
  });
