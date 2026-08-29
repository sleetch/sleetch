import fs from 'node:fs';
import path from 'node:path';

export function write_file(file_path: string, content: string) {
  const directory_path = path.dirname(file_path);
  if (!fs.existsSync(directory_path)) fs.mkdirSync(directory_path, { recursive: true });
  fs.writeFileSync(file_path, content);
}
