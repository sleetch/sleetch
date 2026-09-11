import type { studio_events } from '@sleetch/core/studio';
import { create_client } from '@sleetch/websockets/client';
import { use } from 'react';
import { useClientStore } from '../stores/client';

let client: ReturnType<typeof create_client<studio_events>> | null = null;

function getClient(token: string) {
	if (client === null) {
		client = create_client<studio_events>({
			keepalive: true,
			url: new URL(`ws://localhost:2008/${token}`),
		});

		client.on('update-languages', (data) => {
			useClientStore.getState().set_languages(data.languages);
		});

		client.on("update-tree", (data) => {
			useClientStore.getState().set_tree(data.language, data.tree);
		});

		client.on("update-sources", (data) => {
			useClientStore.getState().set_sources(data.sources);
		});
	}
	return client;
}

export function useClient(token: string) {
	const c = getClient(token);
	use(c.ready);
	return c;
}
