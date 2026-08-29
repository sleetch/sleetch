import path from 'node:path';
import { get_configuration } from '@/configuration';
import type { source } from '@/configuration/types/sources';
import type { content } from '../types/content';
import type { tree_object } from '../types/routing';
import { CACHE_FOLDER } from '../utils/constants';
import { write_file } from '../utils/write-file';
import { sleetch_events_emitter } from './emitter';
import { generate_manifest } from './generators/manifest';
import { generate_tree } from './generators/tree';
import { sleetch_router } from './router';
import type { sleetch_source } from './source';
import { sleetch_file_system_source } from './sources/file-system';

export class sleetch_runtime {
    private sources_map: Map<string, sleetch_source<tree_object, content, source>> = new Map();
    private event_emitter = new sleetch_events_emitter();
    private _router = new sleetch_router();

    private get sources_instances() {
        return this.sources_map.values();
    }

    constructor() {
        this.event_emitter.on('edited', async (content, source) => {
            console.log('edited', content);
            const object = source.router.get_object(content);
            source.builder.build_object(source.language, object);
            this._router.join_object(source.language, object);
            this.build_tree(source.language);
            this.build_manifest();
        });

        this.event_emitter.on('added', async (content, source) => {
            console.log('added', content);
            const object = source.router.get_object(content);
            source.builder.build_object(source.language, object);
            this._router.join_object(source.language, object);
            this.build_tree(source.language);
            this.build_manifest();
        });

        this.event_emitter.on('removed', async (content, source) => {
            console.log('removed', content);
            const path = this._router.path_from_content(source.language, content);
            if (path) {
                this._router.remove_object_from_path(source.language, path);
            } else {
                throw new Error('WHATTTTTTTTTT');
            }
            this.build_tree(source.language);
            this.build_manifest();
        });
    }

    public readonly sources = {
        loaded: () => {
            return this.sources_map.size > 0;
        },
        load: async () => {
            if (this.sources_map.size > 0) throw new Error('You cannot load sources twice.');
            console.time('runtime.sources.load');
            const configuration = get_configuration();
            for (const source of configuration.sources) {
                if (source.type === 'file-system') {
                    const instance = new sleetch_file_system_source({ source, events_emitter: this.event_emitter });
                    this.sources_map.set(instance.id, instance);
                }
            }
            console.timeEnd('runtime.sources.load');
        },
        watch: async () => {
            console.time('runtime.sources.watch');
            for (const source of this.sources_instances) {
                await source.watcher.watch();
            }
            console.timeEnd('runtime.sources.watch');
        },
        close: async () => {
            for (const source of this.sources_instances) {
                source.watcher.close();
            }
        },
    };

    public readonly router = {
        load: async () => {
            console.time('runtime.router.load');
            for (const source of this.sources_instances) {
                await source.router.load(this._router);
            }
            console.timeEnd('runtime.router.load');
        },
    };

    public readonly builder = {
        build: async () => {
            console.time('runtime.builder.build');
            await this.router.load();
            for (const language of this._router.get_languages()) {
                for (const object of this._router.get_tree(language)) {
                    await this.builder.build_object(language, object);
                }
                this.build_tree(language);
            }
            this.build_manifest();
            console.timeEnd('runtime.builder.build');
        },
        build_object: async (language: string, object: tree_object) => {
            if (object.type === 'category') {
                if (object.page) {
                    await this.builder.build_object(language, object.page);
                }
                for (const child_object of object.children) {
                    await this.builder.build_object(language, child_object);
                }
            } else {
                console.time('runtime.builder.build_object');
                const instance = this.resolve_source(object.content.source_id);
                instance.builder.build_object(language, object);
                console.timeEnd('runtime.builder.build_object');
            }
        },
    };

    private build_tree(language: string) {
        const tree = this._router.get_tree(language);
        const files = generate_tree(tree);
        for (const extension of Object.keys(files) as (keyof typeof files)[]) {
            write_file(path.join(CACHE_FOLDER, 'trees', language + extension), files[extension]);
        }
    }

    private build_manifest() {
        const files = generate_manifest(this._router);
        for (const extension of Object.keys(files) as (keyof typeof files)[]) {
            write_file(path.join(CACHE_FOLDER, `manifest${extension}`), files[extension]);
        }
    }

    private resolve_source(source_id: string) {
        const instance = this.sources_map.get(source_id);
        if (!instance) throw new Error('Could not find any sources with that id.');
        return instance;
    }
}
