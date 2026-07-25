import fs from 'fs';
import path from 'path';

export function write_file(file_path: string, content: string) {
  const directory_path = path.dirname(file_path);
  if (!fs.existsSync(directory_path)) fs.mkdirSync(directory_path, { recursive: true });
  fs.writeFileSync(file_path, content);
}
