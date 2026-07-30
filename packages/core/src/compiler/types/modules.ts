import type { page_frontmatter, parser_output, toc } from '@/markdown';
import type { tree_object } from './routing';

export type tree_module = { default: tree_object[] };

export type markdown_module = {
  default: {
    toc: toc;
    frontmatter: page_frontmatter;
    parsed: parser_output;
  };
};

export type manifest_module = {
  default: {
    languages: string[];
  } & Record<
    string,
    {
      tree: () => Promise<tree_module>;
      markdown_modules: Record<string, () => Promise<markdown_module>>;
    }
  >;
};
