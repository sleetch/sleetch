import { get_configuration } from '@/configuration';
import type { git_source } from '@/configuration/types/sources';
import type { ladoc_watcher_emmiter } from '../../watcher';

export class ladoc_git_watcher {
  constructor(private events_emitter: ladoc_watcher_emmiter) {}

  async watch(source: git_source) {
    const configuration = await get_configuration();
    configuration.logger.error('Git based watching is not implemented yet.');
  }
}
