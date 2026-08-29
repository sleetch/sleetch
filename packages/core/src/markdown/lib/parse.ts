import { get_configuration, type parsed_sleetch_configuration } from '@/configuration';
import type { engines } from '../types/engine';
import { bun } from './engines/bun';
import { dummy } from './engines/dummy';
import { markdown_it } from './engines/markdown-it';
import { marked } from './engines/marked';
import { mdx_js } from './engines/mdx-js';

export const markdown_engines: engines = {
  bun: bun,
  sleetch: dummy,
  'markdown-it': markdown_it,
  marked: marked,
  'mdx-js': mdx_js,
};

export const get_parsed_markdown = async (content: string, _engine?: parsed_sleetch_configuration['markdown']['engine']) => {
  const configuration = get_configuration();
  const engine = _engine ? _engine : configuration.markdown.engine;
  // const start = Date.now();
  const output = markdown_engines[engine](content);
  // const end = Date.now();
  // configuration.logger.debug('parsed with', engine, 'in', end - start, 'ms');
  return output;
};
