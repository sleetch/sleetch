import type { data_frontmatter, page_frontmatter } from '@/markdown';
import type { content } from './content';

export interface data<C extends content> {
  path: string;
  type: 'data';
  frontmatter: data_frontmatter;
  content: C;
}

export interface page<C extends content> {
  path: string;
  type: 'page';
  frontmatter: page_frontmatter;
  content: C;
  index?: boolean;
}

export interface category<T> {
  path: string;
  type: 'category';
  children: T[];
}

export type tree_object = data<content> | page<content> | category<tree_object>;
