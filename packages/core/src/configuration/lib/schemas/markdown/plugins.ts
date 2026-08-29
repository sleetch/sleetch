import z from 'zod';

export const plugins_schema = z
    .object({
        syntax_highlighting: z.boolean().default(false),
        mermaid: z.boolean().default(false),
        latex: z.boolean().default(false),
    })
    .default({
        syntax_highlighting: false,
        mermaid: false,
        latex: false,
    });
