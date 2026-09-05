import { Button, DocumentationHeader, DocumentationSidebarToggle } from '@sleetch/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import Logo from '@/assets/images/branding/logo.svg?react';
import Discord from '@/assets/images/logos/discord.svg?react';
import Github from '@/assets/images/logos/github.svg?react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function CustomDocumentationHeader() {
	return (
		<DocumentationHeader className="flex items-center gap-2 justify-between">
			<DocumentationSidebarToggle />

			<div className="flex items-center gap-2">
				<Link to={'/'} rel={'_blank'} className="flex items-center gap-2">
					<Logo className="size-8  " />
					<h1 className="font-brand font-bold  text-2xl">Sleetch</h1>
				</Link>
			</div>

			<div className=" items-center gap-2 hidden sm:flex">
				<Link to={'https://sleetch.net'} rel={'_blank'}>
					<Button variant="ghost" className="gap-2 justify-center">
						sleetch.net <ExternalLink className="size-4.5" />
					</Button>
				</Link>

				<Link to={'https://discord.gg/UuJMtFvpX4'} rel={'_blank'}>
					<Button className="aspect-square p-1.5!">
						<Discord className="size-5 fill-foreground" />
					</Button>
				</Link>

				<Link to={'https://github.com/sleetch/sleetch'} rel={'_blank'}>
					<Button className="aspect-square p-1.5!">
						<Github className="size-5 fill-foreground" />
					</Button>
				</Link>

				<ThemeToggle />
			</div>
		</DocumentationHeader>
	);
}
