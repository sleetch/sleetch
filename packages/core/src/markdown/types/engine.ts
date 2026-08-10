import type { parsed_sleetch_configuration } from '@/configuration';

export type parser_output = { type: 'html'; html: string } | { type: 'module'; code: string };
export type parser = (content: string) => Promise<parser_output>;

export type engine = parsed_sleetch_configuration['markdown']['engine'];
export type engines = Record<engine, parser>;
