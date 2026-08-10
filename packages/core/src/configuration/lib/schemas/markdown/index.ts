import z from 'zod';
import { engine_schema } from './engine';
import { plugins_schema } from './plugins';

export const markdown_schema = z
  .object({
    engine: engine_schema,
    plugins: plugins_schema,
  })
  .default({
    engine: 'sleetch',
    plugins: {
      syntax_highlighting: true,
      mermaid: false,
      latex: true,
    },
  });
