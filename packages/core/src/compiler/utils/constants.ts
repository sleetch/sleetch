import path from 'node:path';
import { get_root_dir } from '@/shared';

export const INDEX_PAGE_NAME = '_index';
export const DATA_PAGE_NAME = '_data';

export const ROOT_FOLDER = get_root_dir()

export const NODE_MODULES_FOLDER = path.join(ROOT_FOLDER, 'node_modules');
export const CACHE_FOLDER = path.join(NODE_MODULES_FOLDER, '/@sleetch/client/.sleetch');

export const PAGES_CACHE_FOLDER = path.join(CACHE_FOLDER, 'pages');
export const TREES_CACHE_FOLDER = path.join(CACHE_FOLDER, 'trees');
