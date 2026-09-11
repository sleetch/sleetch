import { get_configuration } from '@sleetch/core/configuration';
import { studio_events } from '@sleetch/core/studio';
import { get_tree } from '@sleetch/server';
import { WebsocketServer } from '@sleetch/websockets/server';
import type { command, command_options } from '@/types/command';

const options = {} as const satisfies command_options;

export const studio_command: command<typeof options> = {
	name: 'studio',
	description: 'Start content studio.',
	active: true,
	options,
	action: async (options, cli) => {
		try {
			const { sleetch_runtime } = await import('@sleetch/core/compiler');
			const { get_languages } = await import('@sleetch/server');

			const token = crypto.randomUUID();

			const server = new WebsocketServer({ events: studio_events, port: 2008, path: `/${token}` });
			const runtime = new sleetch_runtime();

			await runtime.sources.load();
			await runtime.builder.build();
			await runtime.sources.watch();

			console.log(`Open http://localhost:5173/?token=${token}`);

			server.on('connect', (socket) => {
				server.call({ id: 'get-languages', data: {} }, socket);
				server.call({ id: 'get-trees', data: {} }, socket);
				server.call({ id: 'get-sources', data: undefined }, socket);
			});

			server.on('get-languages', async (_, socket) => {
				console.log('get languagessss');
				await socket.send({
					id: 'update-languages',
					data: {
						languages: await get_languages(),
					},
				});
			});

			server.on('get-trees', async (_, socket) => {
				const languages = await get_languages();
				for (const language of languages) {
					const { tree } = await get_tree(language);
					await socket.send({
						id: 'update-tree',
						data: {
							language,
							tree,
						},
					});
				}
			});

			server.on('get-tree', async (data, socket) => {
				const { tree, language } = await get_tree(data.language);
				await socket.send({
					id: 'update-tree',
					data: {
						language,
						tree,
					},
				});
			});

			server.on('get-sources', async (data, socket) => {
				const { sources } = get_configuration();
				await socket.send({
					id: 'update-sources',
					data: {
						sources
					},
				});
			});

			runtime.watcher.on('updated-manifest', async () => {
				const languages = await get_languages();
				server.broadcast({
					id: 'update-languages',
					data: {
						languages,
					},
				});
			});

			runtime.watcher.on('updated-tree', async (language) => {
				console.log("updated")
				const { tree } = await get_tree(language);
				server.broadcast({
					id: 'update-tree',
					data: {
						language,
						tree,
					},
				});
			});

		} catch (error) {
			if (error instanceof Error) cli.error('error', error.message);
		}
	},
};
