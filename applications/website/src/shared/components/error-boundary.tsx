import { isRouteErrorResponse, useRouteError } from 'react-router';
import { useSleeky } from './use-sleeky';

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
  const { Component, set_cursor_position } = useSleeky({ lerp_amount: 0.5 });

  return (
    <main
      onMouseMove={(e) => {
        set_cursor_position({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={(e) => {
        set_cursor_position({ x: 0, y: 0 });
      }}
      className="min-h-screen p-8 space-y-2 flex flex-col items-center justify-center w-full"
    >
      <h1 className="text-2xl">{message}</h1>
      <Component className="size-30" />

      <p className="text-lg">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
