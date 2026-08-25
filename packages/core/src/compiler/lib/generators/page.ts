import { extract_frontmatter, extract_toc, get_parsed_markdown, page_frontmatter_schema } from '@/markdown';

export const generate_page_module = async (raw_markdown: string) => {
  const { frontmatter, markdown: markdown_without_frontmatter } = extract_frontmatter(raw_markdown, page_frontmatter_schema);
  const { toc, markdown: markdown_with_anchors } = extract_toc(markdown_without_frontmatter);
  const parsed_markdown = await get_parsed_markdown(markdown_with_anchors, frontmatter.engine);
  return {
    '.js': `
      export default {
        type: "page",
        frontmatter: ${JSON.stringify(frontmatter)},
        toc: ${JSON.stringify(toc)},
        parsed: ${JSON.stringify(parsed_markdown)}
      };
    `,
    '.d.ts': '',
  };
};
