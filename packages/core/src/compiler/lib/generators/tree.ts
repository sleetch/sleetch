import type { tree_object } from '@/compiler/types/routing';

export const generate_tree = async (tree: tree_object[]) => {
  return `
    export default ${JSON.stringify(tree)};
  `;
};
