import { Outlet } from 'react-router';

export function meta() {
    return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Layout() {
    return (
        <main className="min-h-screen relative">
            {/*<LandingHeader /> */}
            <Outlet />
        </main>
    );
}

// <NoiseOverlay size={250} opacity={1} />;
