import { isRouteErrorResponse, useRouteError } from 'react-router';
import { ErrorPage } from './error-page';

export function ErrorBoundary() {
	const error = useRouteError();
	let message = 'Oops !';
	let details = "Une erreur inconnue s'est produite.";
	let stack: string | undefined;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? "La page demandée n'existe pas. " : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}
	return <ErrorPage message={message} details={details} stack={stack} />;
}
