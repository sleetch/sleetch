import z from 'zod';

export const languages_schema = z
	.object({
		default: z.string(),
	})
	.default({
		default: 'en',
	});
