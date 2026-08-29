import z from 'zod';
import type { logger_functions } from '@/configuration/types/logger';

export const logger_schema = z.custom<logger_functions>().default(console);
