import { isRouteErrorResponse } from 'react-router';
import { useRouteError } from 'react-router';
import '@sleetch/client/markdown.css';

export function ErrorBoundary() {
  const error = useRouteError();
  let message = 'Error.';
  let details = 'No more details.';
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'This page doesnt exist.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="sleetch-markdown">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
