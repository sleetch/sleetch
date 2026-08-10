import { get_llms } from '@sleetch/server';

export const loader = async () => {
  const llms_txt = await get_llms(({ path, language }) => new URL('/' + language + '/' + 'documentation' + path, 'https://sleetch.net').toString());
  return llms_txt;
};
