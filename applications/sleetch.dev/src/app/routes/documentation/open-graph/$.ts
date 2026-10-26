import { get_page } from '@sleetch/server';
import { data } from 'react-router';
import type { Route } from '../+types/open-graph';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { generate_open_graph } = await import('@/features/documentation/open-graph/utils');
  const url = new URL(request.url);
  let path = url.pathname.slice(25);
  if (url.pathname.endsWith('.data')) {
    path = path.slice(0, -5);
    // or return data(null, { status: 200 });
  }
  if (!path.endsWith('.png')) {
    throw data(null, { status: 400 });
  }
  path = path.slice(0, -4);
  const page_data = await get_page(path);
  if (!page_data) {
    throw data(null, { status: 404 });
  }
  return generate_open_graph({
    title: page_data.seo.title,
    description: page_data.seo.description,
  });
};
