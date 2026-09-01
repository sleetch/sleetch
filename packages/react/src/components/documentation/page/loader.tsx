import type { page_module } from 'packages/core/dist/compiler';
import { type FC, type ReactNode, use } from 'react';

export const PageLoader: FC<{ page: Promise<page_module>; children: (page: page_module['default']) => ReactNode }> = ({ page, children }) => {
	const resolved = use(page);
	return children(resolved.default);
};
