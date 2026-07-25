import type { file_info } from '@/compiler/types/watcher';
import fs from 'fs';
import path from 'path';
import type { file_system_source } from '@/configuration/types/sources';
import { get_configuration } from '@/configuration';
import type { ladoc_watcher_emmiter } from '../../watcher';

export class ladoc_file_system_watcher {
  private files = new Map<string, Map<string, file_info>>();
  private debounces = new Map<string, NodeJS.Timeout>();

  constructor(private events_emitter: ladoc_watcher_emmiter) {
    this.init();
  }

  async init() {
    const configuration = await get_configuration();

    for (const source of configuration.sources) {
      if (source.type === 'file-system') {
        this.watch(source);
      }
    }
  }

  async watch(source: file_system_source) {
    const root = source.path;

    this.files.set(root, await this.scan(root));

    fs.watch(root, { recursive: true }, () => {
      const debounce = this.debounces.get(root);

      if (debounce) {
        clearTimeout(debounce);
      }

      this.debounces.set(
        root,
        setTimeout(() => {
          this.sync(root, source);
        }, 50)
      );
    });
  }

  private async scan(dir: string, files = new Map<string, file_info>()): Promise<Map<string, file_info>> {
    let entries: fs.Dirent[];

    try {
      entries = await fs.promises.readdir(dir, { withFileTypes: true });
    } catch {
      return files;
    }

    for (const entry of entries) {
      const p = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await this.scan(p, files);
        continue;
      }

      try {
        const stat = await fs.promises.stat(p);

        files.set(p, {
          mtimeMs: stat.mtimeMs,
          size: stat.size,
        });
      } catch {}
    }

    return files;
  }

  private async sync(root: string, source: file_system_source) {
    const previous = this.files.get(root) ?? new Map();
    const current = await this.scan(root);

    for (const [file, info] of current) {
      const old = previous.get(file);

      if (!old) {
        this.events_emitter.emit('added', { type: 'file-system', file_path: file }, source);
        continue;
      }

      if (old.mtimeMs !== info.mtimeMs || old.size !== info.size) {
        this.events_emitter.emit('edited', { type: 'file-system', file_path: file }, source);
      }
    }

    for (const file of previous.keys()) {
      if (!current.has(file)) {
        this.events_emitter.emit('removed', { type: 'file-system', file_path: file }, source);
      }
    }

    this.files.set(root, current);
  }
}
