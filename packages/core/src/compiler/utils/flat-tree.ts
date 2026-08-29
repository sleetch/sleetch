import type { content } from '../types/content';
import type { page, tree_object } from '../types/routing';

export const to_flat_tree = (tree: tree_object[], _parent_path: string = '/'): page<content>[] => {
  const pages: page<content>[] = [];
  for (const object of tree) {
    if (object.type === 'page') {
      pages.push(object);
    } else if (object.type === 'category') {
      if (object.page) pages.push(object.page);
      pages.push(...to_flat_tree(object.children, object.path));
    }
  }
  return pages;
};
