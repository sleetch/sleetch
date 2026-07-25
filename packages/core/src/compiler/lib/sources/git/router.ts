import type { ladoc_router } from '@/compiler/lib/router';
import type { git_tree_object } from '@/compiler/types/routing';
import type { git_source } from '@/configuration/types/sources';

export class ladoc_git_router {
  constructor(private router: ladoc_router) {}
  async load() {}
  get_tree(source: git_source): git_tree_object[] {
    console.warn(`Any watcher implemented.`);
    return [];
  }
}
