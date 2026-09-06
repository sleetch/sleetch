import { defineBook } from '@sleetch/react';

export const { Component: Book } = defineBook({
	file: () => import('./stories/file'),
	button: () => import('./stories/button'),
	spinner: () => import('./stories/spinner'),
});

export default Book;
