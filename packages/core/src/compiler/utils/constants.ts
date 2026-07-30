import { get_root_dir } from '@/shared';
import path from 'path';

export const INDEX_PAGE_NAME = '_index';
export const DATA_PAGE_NAME = '_data';

export const NODE_MODULES_FOLDER = path.join(get_root_dir(), 'node_modules');
export const CACHE_FOLDER = path.join(NODE_MODULES_FOLDER, '/@ladoc/cache/.ladoc');
