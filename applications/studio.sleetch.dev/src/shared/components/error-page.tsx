import { cn } from "../utils/cn";
import { useSleeky } from "./use-sleeky";

export function ErrorPage({ message, details, stack, height = "screen" }: {
	height?: 'full' | `screen`
	message: string, details: string, stack?: string
}) {
	const { Component, set_cursor_position } = useSleeky({ lerp_amount: 0.5 });

	return (
		<main
			onMouseMove={(e) => {
				set_cursor_position({ x: e.clientX, y: e.clientY });
			}}
			onMouseLeave={(_e) => {
				set_cursor_position({ x: 0, y: 0 });
			}}
			className={cn("p-8 space-y-2 flex flex-col items-center justify-center w-full", `h-${height}`)}
		>
			<h1 className="text-2xl">{message}</h1>
			<Component className="size-30" />
			<p className="text-lg">{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
