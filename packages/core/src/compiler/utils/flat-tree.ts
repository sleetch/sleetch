import type { content } from '../types/content';
import type { page, tree_object } from '../types/routing';

export const to_flat_tree = (tree: tree_object[], parent_path: string = '/'): page<content>[] => {
  const pages: page<content>[] = [];

  for (const object of tree) {
    switch (object.type) {
      case 'page':
        if (object.index && parent_path) {
          pages.push({
            ...object,
            path: parent_path,
          });
        } else {
          pages.push(object);
        }
        break;

      case 'category':
        pages.push(...to_flat_tree(object.children, object.path));
        break;

      case 'data':
        break;
    }
  }

  return pages;
};
