import path from 'path';
import fs from 'fs';

export function get_root_dir() {
  let root = process.cwd();
  while (!fs.existsSync(path.join(root, 'package.json'))) {
    root = path.join(root, '..');
  }
  return root;
}
