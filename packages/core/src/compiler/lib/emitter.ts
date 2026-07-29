import { EventEmitter } from 'events';
import type { watcher_events } from '../types/watcher';
export class ladoc_events_emitter extends EventEmitter<watcher_events> {}
