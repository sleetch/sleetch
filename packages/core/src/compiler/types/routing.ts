import type { data_frontmatter, page_frontmatter } from '@/markdown';
import type { content, file_system_content, git_content } from './content';

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

export type file_system_data = data<file_system_content>;
export type git_data = data<git_content>;

export type file_system_page = page<file_system_content>;
export type git_page = page<git_content>;

export type tree_object = data<file_system_content> | data<git_content> | page<file_system_content> | page<git_content> | category<tree_object>;
export type file_system_tree_object = data<file_system_content> | page<file_system_content> | category<file_system_tree_object>;
export type git_tree_object = data<file_system_content> | data<git_content> | category<git_tree_object>;

export function has_content<O extends { content: content }, T extends content['type']>(
  object: O,
  type: T
): object is O & { content: Extract<content, { type: T }> } {
  return object.content.type === type;
}
