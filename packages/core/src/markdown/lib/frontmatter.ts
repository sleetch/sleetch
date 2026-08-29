import { parse as parse_yaml } from 'yaml';
import z from 'zod';

export const extract_frontmatter = <FrontmatterSchema extends z.ZodTypeAny>(
  input: string,
  schema: FrontmatterSchema
): { frontmatter: z.infer<FrontmatterSchema>; markdown: string } => {
  const lines = input.split('\n');
  let start_index: number | undefined ;
  let end_index: number | undefined ;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    if (line.trim() === '---') {
      if (!start_index) start_index = i + 1;
      else if (!end_index) {
        end_index = i;
        break;
      }
    } else if (!start_index) break;
  }
  if (start_index && end_index && start_index !== end_index) {
    const raw_frontmatter = lines.slice(start_index, end_index).join('\n');
    const markdown = lines.slice(end_index + 1).join('\n');
    const parsed_frontmatter = parse_yaml(raw_frontmatter);
    const { data: frontmatter, error } = schema.safeParse(parsed_frontmatter);
    if (error) {
      throw new Error(z.prettifyError(error));
    }
    return {
      frontmatter,
      markdown,
    };
  }
  const { data: frontmatter, error } = schema.safeParse({});
  if (error) {
    throw new Error(z.prettifyError(error));
  }
  return { frontmatter, markdown: input };
};
