import fs from 'fs';
import path from 'path';

export function get_root_dir() {
  let root = process.cwd();
  const parent = root;
  while (!fs.existsSync(path.join(root, 'package.json'))) {
    const parent = path.dirname(root);
    if (parent === root) {
      throw new Error('Any node JS project was able to be resolved from current working directory.');
    }
    root = parent;
    root = path.join(root, '..');
  }
  return root;
}
