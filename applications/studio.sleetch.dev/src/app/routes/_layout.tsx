import { Outlet } from 'react-router';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Layout() {
	return (
		<Outlet />
	);
}
