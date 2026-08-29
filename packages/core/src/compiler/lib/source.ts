import type { source } from '@/configuration/types/sources';
import type { content } from '../types/content';
import type { tree_object } from '../types/routing';
import { resolve_language } from '../utils/resolve-language';
import type { sleetch_events_emitter } from './emitter';
import type { sleetch_router } from './router';

export abstract class sleetch_source<tree_object_type extends tree_object, content_type extends content, source_type extends source> {
  readonly type: source_type['type'];
  readonly source: source_type;
  protected readonly events_emitter: sleetch_events_emitter;
  public readonly language: string;

  public id: string;

  constructor(configuration: { type: source_type['type']; source: source_type; events_emitter: sleetch_events_emitter }) {
    if (this.constructor == sleetch_source) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }
    this.type = configuration.type;
    this.source = configuration.source;
    this.events_emitter = configuration.events_emitter;
    this.language = resolve_language(configuration.source.language);

    this.id = `${this.type}:${crypto.randomUUID()}`;
  }

  abstract readonly watcher: {
    watch: () => Promise<void>;
    close: () => void;
  };

  abstract readonly builder: {
    get_object_build_path(object: tree_object_type): string;
    build_object(language: string, object: tree_object_type): Promise<void>;
  };

  abstract readonly router: {
    load(router: sleetch_router): Promise<void>;
    get_object(content: content_type): tree_object_type;
  };
}
