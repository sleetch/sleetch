import type { studio_events } from '@sleetch/core/studio';
import { create_client } from '@sleetch/websockets/client';
import { use } from 'react';
import { useClientStore } from '../stores/client';

let client: ReturnType<typeof create_client<studio_events>> | null = null;

function getClient() {
	if (client === null) {
		client = create_client<studio_events>({
			keepalive: true,
			url: new URL('ws://localhost:2008'),
		});

		client.on('update-languages', (data) => {
			useClientStore.getState().set_languages(data.languages);
		});
	}
	return client;
}

export function useClient() {
	const c = getClient();
	use(c.ready);
	return c;
}
