import type { content, file_system_content, git_content } from '../types/content';
import type { source } from '@/configuration/types/sources';
import type { category, page, tree_object } from '../types/routing';

export class ladoc_router {
  private trees: Map<string, tree_object[]> = new Map();
  private source_index: Map<string, Map<string, string>> = new Map();

  get_tree(language: string): tree_object[] {
    let tree = this.trees.get(language);
    if (!tree) {
      tree = [];
      this.trees.set(language, tree);
    }
    return tree;
  }

  get_flat_tree(language: string) {
    return this.flat_tree(this.get_tree(language));
  }

  get_languages(): string[] {
    return [...this.trees.keys()];
  }

  private flat_tree(tree: tree_object[], parent_path: string = '/'): Array<page<file_system_content> | page<git_content>> {
    const pages: Array<page<file_system_content> | page<git_content>> = [];

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
          pages.push(...this.flat_tree(object.children, object.path));
          break;

        case 'data':
          break;
      }
    }

    return pages;
  }

  private get_source_index(language: string): Map<string, string> {
    let index = this.source_index.get(language);
    if (!index) {
      index = new Map();
      this.source_index.set(language, index);
    }
    return index;
  }

  insert_object(language: string, object: tree_object, tree: tree_object[] = this.get_tree(language)) {
    const index = tree.findIndex((o) => o.path === object.path);
    if (index === -1) {
      tree.push(object);
    } else {
      const existing = tree[index];
      if (existing.type === 'category' && object.type === 'category') {
        for (const child of object.children) {
          /*  if (child.type == 'page' && child.index == true) {
            existing.path = child.path;
          }*/
          this.insert_object(language, child, existing.children);
        }
        return;
      }
      tree[index] = object;
    }
    if (object.type === 'page' || object.type === 'data') {
      this.get_source_index(language).set(this.source_key(object.content), object.path);
    }
  }

  remove_object(language: string, object: tree_object) {
    this.remove_object_from_path(language, object.path);
  }

  join_object(language: string, object: tree_object, tree: tree_object[] = this.get_tree(language)) {
    if (object.type === 'page' || object.type === 'data') {
      const previous_path = this.get_source_index(language).get(this.source_key(object.content));
      if (previous_path && previous_path !== object.path) {
        this.remove_object_from_path(language, previous_path);
      }
    }
    const target = this.ensure_category_path(language, object.path, tree);
    this.insert_object(language, object, target);
  }

  join(language: string, tree: tree_object[]) {
    for (const object of tree) {
      this.join_object(language, object);
    }
  }

  remove_object_from_path(language: string, path: string, tree: tree_object[] = this.get_tree(language)): boolean {
    const index = tree.findIndex((o) => o.path === path);
    if (index !== -1) {
      const [removed] = tree.splice(index, 1);
      if (removed.type === 'page' || removed.type === 'data') {
        this.get_source_index(language).delete(this.source_key(removed.content));
      }
      return true;
    }
    for (const node of tree) {
      if (node.type !== 'category') continue;
      if (this.remove_object_from_path(language, path, node.children)) {
        if (node.children.length === 0) {
          const i = tree.indexOf(node);
          tree.splice(i, 1);
        }
        return true;
      }
    }
    return false;
  }

  path_from_content(language: string, content: content) {
    return this.get_source_index(language).get(this.source_key(content));
  }

  private source_key(content: content): string {
    if (content.type === 'file-system') return `file-system:${content.file_path}`;
    if (content.type === 'git') return `git:${content.file_url}`;
    return `unknown`;
  }

  private ensure_category_path(language: string, path: string, tree: tree_object[] = this.get_tree(language)): tree_object[] {
    const segments = path.split('/').filter(Boolean);
    segments.pop();
    let current_tree = tree;
    let cumulative = '';
    for (const segment of segments) {
      cumulative = `${cumulative}/${segment}`;
      let category = current_tree.find((o): o is category<tree_object> => o.type === 'category' && o.path === cumulative);
      if (!category) {
        category = { type: 'category', path: cumulative, children: [] };
        current_tree.push(category);
      }
      current_tree = category.children;
    }
    return current_tree;
  }
}
