import { Spinner } from "@sleetch/react";

export type LoadingPageProps = {
	state?: {
		type: "error" | "pending" | "success"
		message: string
	}
}

export function LoadingPage({ state }: LoadingPageProps) {
	return <main className="w-screen h-screen grid place-items-center">
		<Spinner size='medium' />
		{state && <>
			{state.message}
		</>}
	</main>
}
