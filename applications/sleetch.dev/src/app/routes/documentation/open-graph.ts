import { get_page } from '@sleetch/server';
import { data } from 'react-router';
import { generate_open_graph } from '@/features/documentation/open-graph/utils';
import type { Route } from './+types/open-graph';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');

  if (!path) {
    throw data(null, { status: 400 });
  }

  const page_data = await get_page(path);

  if (!page_data) {
    throw data(null, { status: 404 });
  }

  return generate_open_graph({
    title: page_data.seo.title,
    description: page_data.seo.description,
  });
};
