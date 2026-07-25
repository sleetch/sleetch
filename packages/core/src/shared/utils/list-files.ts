import fs from 'fs';
import path from 'path';

export function list_all_files(dir: string): string[] {
  const result: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full_path = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...list_all_files(full_path));
    } else if (entry.isFile()) {
      result.push(full_path);
    }
  }

  return result;
}
