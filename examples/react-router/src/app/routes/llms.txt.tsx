import { get_llms } from '@ladoc/server';

export const loader = async () => {
  const llms_txt = await get_llms(({ path, language }) => new URL('/' + language + '/' + 'documentation' + path, 'https://ladoc.net').toString());
  return llms_txt;
};
