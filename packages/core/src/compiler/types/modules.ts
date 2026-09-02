import type { page_frontmatter, parser_output, toc } from '@/markdown';
import type { tree_object } from './routing';

export type tree_module = { default: tree_object[] };

export type page_module = {
	default: {
		type: 'page';
		toc: toc;
		frontmatter: page_frontmatter;
		parsed: parser_output;
	};
};

export type category_module = {
	default: {
		type: 'category';
		frontmatter: page_frontmatter;
		page: page_module['default'];
	};
};

export type object_module = page_module | category_module;

export type manifest_module = {
	default: {
		languages: string[];
	} & Record<
		string,
		{
			tree: () => Promise<tree_module>;
			pages: Record<string, () => Promise<page_module>>;
		}
	>;
};
