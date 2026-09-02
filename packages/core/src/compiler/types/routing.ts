import type { data_frontmatter, page_frontmatter } from '@/markdown';
import type { content } from './content';

export interface page<C extends content> {
	path: string;
	type: 'page';
	frontmatter: page_frontmatter;
	content: C;
}

export interface category<T, C extends content> {
	path: string;
	type: 'category';
	frontmatter?: data_frontmatter;
	page?: page<C>;
	children: T[];
}

export type tree_object = page<content> | category<tree_object, content>;
