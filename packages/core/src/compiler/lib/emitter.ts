import { EventEmitter } from 'node:events';
import type { watcher_events } from '../types/watcher';
export class sleetch_events_emitter extends EventEmitter<watcher_events> {}
