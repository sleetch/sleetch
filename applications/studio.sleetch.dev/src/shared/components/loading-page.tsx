import { Spinner } from "@sleetch/react";
import { cn } from "../utils/cn";

export type LoadingPageProps = {
	height?: 'full' | `screen`
	state?: {
		type: "error" | "pending" | "success"
		message: string
	}
}

export function LoadingPage({ height = "screen", state }: LoadingPageProps) {
	return <main className={cn("w-full max-h-screen flex items-center justify-center gap-2 relative", `h-${height}`)}>
		<Spinner size='medium' />
		{state && <>
			<p className="text-sm text-accent-foreground">{state.message}</p>
		</>}
	</main>
}
