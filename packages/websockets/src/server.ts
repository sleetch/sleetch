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

export class WebsocketServer<E extends events> {
	private server;

	private sockets = new Set<WebSocket>();

	private custom_listeners: {
		connect: ((socket: SleetchSocket<E[number]>) => void)[]
	} = {
			connect: []
		}

	private listeners = new Map<
		Extract<E[number], { from: 'client' }>['id'],
		Parameters<
			<I extends Extract<E[number], { from: 'client' }>['id']>(
				id: I,
				callback: (
					data: z.infer<
						Extract<
							Extract<E[number], { from: 'client' }>,
							{ id: I }
						>['schema']
					>,
					socket: SleetchSocket<E[number]>
				) => void
			) => void
		>['1'][]
	>();

	constructor(configuration: {
		events: E;
		port: number;
		path: string;
	}) {
		this.server = new WebSocketServer({
			port: configuration.port,
			path: configuration.path,
		});
		this.server.on('connection', (socket) => {
			console.log('Client connected');
			this.sockets.add(socket);
			const sleetch_socket = new SleetchSocket<E[number]>(socket)
			for (const listener of this.custom_listeners.connect) {
				listener(sleetch_socket)
			}
			socket.on('message', (raw) => {
				try {
					const message = JSON.parse(raw.toString());
					if (typeof message === 'object' && message !== null && 'id' in message && typeof message.id === 'string') {
						const event = configuration.events.find((event) => event.id === message.id);
						if (event) {
							const parsed = event.schema.parse(message.data)
							this.call({ id: message.id, data: parsed }, sleetch_socket)
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
				this.sockets.delete(socket);
				console.log('Client disconnected');
			});
		});
	}

	call<I extends Extract<E[number], { from: 'client' }>['id']>(
		data: { id: I, data: z.infer<Extract<Extract<E[number], { from: 'client' }>, { id: I }>['schema']> },
		socket: SleetchSocket<E[number]>
	) {
		const callbacks = this.listeners.get(data.id);
		if (callbacks) {
			for (const callback of callbacks) {
				callback(data.data, socket);
			}
		}
	}

	on(
		id: 'connect',
		callback: (socket: SleetchSocket<E[number]>) => void,
	): void;
	on<I extends Extract<E[number], { from: 'client' }>['id']>(
		id: I,
		callback: (
			data: z.infer<
				Extract<
					Extract<E[number], { from: 'client' }>,
					{ id: I }
				>['schema']
			>,
			socket: SleetchSocket<E[number]>
		) => void,
	): void;
	on(id: string,
		callback:
			| ((socket: SleetchSocket<E[number]>) => void)
			| ((data: unknown, socket: SleetchSocket<E[number]>) => void),
	) {
		if (id === "connect") {
			this.custom_listeners.connect.push(callback as (socket: SleetchSocket<E[number]>) => void)
		} else {
			const callbacks = this.listeners.get(id);
			if (callbacks) {
				callbacks.push(callback);
			} else {
				this.listeners.set(id, [callback]);
			}
		}
	};

	broadcast = <
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
		for (const _socket of this.sockets) {
			const socket = new SleetchSocket(_socket)
			socket.send(event)
		}
	};
}
