import type z from 'zod';
import type { event, events } from './types/events';

export type on<E extends event<any, z.ZodType, any>> = <I extends Extract<E, { from: 'server' }>['id']>(
	id: I,
	callback: (data: z.infer<Extract<Extract<E, { from: 'server' }>, { id: I }>['schema']>) => void,
) => void;

export type send<E extends event<any, z.ZodType, any>> = <I extends Extract<E, { from: 'client' }>['id']>(
	event: { id: I, data: z.infer<Extract<Extract<E, { from: 'client' }>, { id: I }>['schema']> },
) => void;

export function create_client<E extends events>(configuration: {
	keepalive: boolean;
	url: URL;
}): {
	on: on<E[number]>;
	send: send<E[number]>;
} {
	const socket = new WebSocket(configuration.url);
	const on: on<E[number]> = (id, callback) => {
		socket.addEventListener('message', (event) => {
			try {
				const message = JSON.parse(event.data);
				if (typeof message === 'object' && message !== null && 'id' in message && typeof message.id === 'string') {
					if (message.id === id) {
						callback(message.data);
					} else {
						return
					}
				} else {
					return;
				}
			} catch {
				return;
			}
		});
	};

	const send: send<E[number]> = (event) => {
		const trySend = () => {
			if (socket.readyState === WebSocket.OPEN) {
				try {
					socket.send(JSON.stringify(event));
				} catch (err) {
					return
				}
			} else if (socket.readyState === WebSocket.CONNECTING) {
				socket.addEventListener('open', trySend, { once: true });
			} else {
				return
			}
		};
		trySend()
	};

	return {
		on,
		send
	};
}
