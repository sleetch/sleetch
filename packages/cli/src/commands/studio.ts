import { studio_events } from '@sleetch/core/studio';
import { create_server } from '@sleetch/websockets/server';
import type { command, command_options } from '@/types/command';

const options = {} as const satisfies command_options;

export const studio_command: command<typeof options> = {
	name: 'studio',
	description: 'Start static-content studio.',
	active: true,
	options,
	action: async (options, cli) => {
		try {
			const { sleetch_runtime } = await import('@sleetch/core/compiler');
			const { get_languages } = await import('@sleetch/server');
			const server = create_server({ events: studio_events, port: 2008, path: "/" });
			const runtime = new sleetch_runtime();
			await runtime.sources.load();
			await runtime.builder.build();
			await runtime.sources.watch();

			server.on("get-languages", async (data, socket) => {
				console.log("get languagessss")
				await socket.send({
					id: "update-languages",
					data: {
						languages: await get_languages()
					}
				})
			})

			runtime.watcher.on("updated-manifest", async () => {
				server.broadcast({
					id: "update-languages",
					data: {
						languages: await get_languages()
					}
				})
			})

		} catch (error) {
			if (error instanceof Error) cli.error('error', error.message);
		}
	},
};
