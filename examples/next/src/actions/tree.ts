"use server";

import { get_tree } from "@ladoc/server";

export async function getDocumentationTree() {
  const { tree } = await get_tree();
  return tree;
}
