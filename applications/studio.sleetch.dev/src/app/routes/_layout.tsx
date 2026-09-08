import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { LoadingPage } from '@/shared/components/loading-page';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Layout() {
	return (
		<Suspense fallback={<LoadingPage />}>
			<Outlet />
		</Suspense>
	);
}
