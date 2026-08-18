import { data } from 'react-router';

export async function loader() {
  throw data(null, { status: 404 });
}

export default function Page() {
  return null;
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
