import { WebSocket, WebSocketServer } from 'ws';
import type z from 'zod';
import type { event, events } from './types/events';

class SleetchSocket<E extends event<any, z.ZodType, any>> {
	private socket
	constructor(socket: WebSocket) {
		this.socket = socket
	}

	async send<I extends Extract<E, { from: 'server' }>['id']>(
		event: { id: I, data: z.infer<Extract<Extract<E, { from: 'server' }>, { id: I }>['schema']> }) {
		if (this.socket.readyState === WebSocket.OPEN) {
			const payload = JSON.stringify(event);
			this.socket.send(payload);
		}
	}
}

export type on<E extends event<any, z.ZodType, any>> = <I extends Extract<E, { from: 'client' }>['id']>(
	id: I,
	callback: (data: z.infer<Extract<Extract<E, { from: 'client' }>, { id: I }>['schema']>,
		socket: SleetchSocket<E>
	) => void,
) => void;

export function create_server<E extends events>(configuration: {
	events: E;
	port: number;
	path: string;
}) {
	const server = new WebSocketServer({
		port: configuration.port,
		path: configuration.path,
	});

	console.log(configuration);

	const clients = new Set<WebSocket>();
	const listeners = new Map<E[number], Parameters<on<E[number]>>['1'][]>();

	server.on('connection', (socket) => {
		console.log('Client connected');
		clients.add(socket);
		socket.on('message', (raw) => {
			try {
				const message = JSON.parse(raw.toString());
				if (typeof message === 'object' && message !== null && 'id' in message && typeof message.id === 'string') {
					const event = configuration.events.find((event) => event.id === message.id);
					if (event) {
						const parsed = event.schema.parse(message.data) as Parameters<Parameters<on<E[number]>>['1']>['0'];
						const callbacks = listeners.get(message.id);
						if (callbacks) {
							for (const callback of callbacks) {
								callback(parsed, new SleetchSocket<E[number]>(socket));
							}
						} else {
							return;
						}
					} else {
						return;
					}
				} else {
					return;
				}
			} catch {
				return;
			}
		});
		socket.on('close', () => {
			clients.delete(socket);
			console.log('Client disconnected');
		});
	});

	const on: on<E[number]> = (id, callback) => {
		const callbacks = listeners.get(id);
		if (callbacks) {
			callbacks.push(callback);
		} else {
			listeners.set(id, [callback]);
		}
	};

	const broadcast = <
		I extends Extract<E[number], { from: 'server' }>['id']
	>(
		event: {
			id: I;
			data: z.infer<
				Extract<
					Extract<E[number], { from: 'server' }>,
					{ id: I }
				>['schema']
			>;
		}
	) => {
		for (const client of clients) {
			const socket = new SleetchSocket(client)
			socket.send(event)
		}
	};

	return {
		on,
		broadcast
	};
}
