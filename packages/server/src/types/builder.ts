export type transformer<T = unknown> = (data: { language: string; path: string }) => T;
