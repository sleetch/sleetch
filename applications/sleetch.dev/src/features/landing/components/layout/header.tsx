import { Button, DocumentationHeader } from '@sleetch/react';
import { Files } from 'lucide-react';
import { Link } from 'react-router';
import Logo from '@/assets/images/branding/logo.svg?react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function LandingHeader() {
	return (
		<DocumentationHeader>
			<div className="flex gap-3 items-center justify-between max-w-337.5 w-full mx-auto fl-px-5/10">
				<Link to={'/'} rel={"_blank"}>

					<div className="flex items-center gap-2">
						<Logo className="size-8  " />
						<h1 className="font-brand font-bold  text-2xl">Sleetch</h1>
					</div>
				</Link>

				<Link to={'/documentation'}>
					<Button variant="secondary" className="gap-2 justify-center">
						RTFM <Files className="size-4.5" />
					</Button>
				</Link>
			</div>
			<div className="absolute right-3">
				<ThemeToggle />
			</div>
		</DocumentationHeader>
	);
}
