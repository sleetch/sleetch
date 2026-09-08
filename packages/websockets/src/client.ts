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
}) {
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
		return new Promise<void>((resolve, reject) => {
			const trySend = () => {
				if (socket.readyState === WebSocket.OPEN) {
					try {
						socket.send(JSON.stringify(event));
						resolve();
					} catch (err) {
						reject(new Error("Could not send event."));
					}
				} else if (socket.readyState === WebSocket.CONNECTING) {
					socket.addEventListener('open', trySend, { once: true });
					socket.addEventListener('error', () => reject(new Error("Socket errored while connecting.")), { once: true });
				} else {
					reject(new Error("Could not send event. Websocket disconnected."));
				}
			};
			trySend();
		});
	};

	const close = () => socket.close()

	const ready = new Promise<void>((resolve, reject) => {
		socket.addEventListener('open', () => resolve(), { once: true });
		socket.addEventListener('error', (err) => reject(new Error(`WebSocket error : ${configuration.url.toString()} : ${err.type}`)), {
			once: true,
		});
	});

	return {
		on,
		send,
		ready,
		close
	};
}
