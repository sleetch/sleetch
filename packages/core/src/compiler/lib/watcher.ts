import { ladoc_git_watcher } from '@/compiler/lib/sources/git/watcher';
import { ladoc_file_system_watcher } from '@/compiler/lib/sources/file-system/watcher';
import { EventEmitter } from 'events';
import type { watcher_events } from '@/compiler/types/watcher';

export class ladoc_watcher_emmiter extends EventEmitter<watcher_events> {}

export class ladoc_watcher {
  private events_emitter = new ladoc_watcher_emmiter();
  private file_system = new ladoc_file_system_watcher(this.events_emitter);
  private git = new ladoc_git_watcher(this.events_emitter);

  public on<K extends keyof watcher_events>(event: K, listener: (...args: watcher_events[K]) => void): this {
    this.events_emitter.on(event, listener);
    return this;
  }
}
