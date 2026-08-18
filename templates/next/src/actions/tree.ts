'use server';

import { get_tree } from '@sleetch/server';

export async function getDocumentationTree() {
  const { tree } = await get_tree();
  return tree;
}
