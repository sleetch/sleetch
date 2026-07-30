import { get_llms } from '@ladoc/server';

export const loader = async () => {
  const llms_txt = await get_llms(({ path }) => new URL('/documentation' + path, 'https://ladoc.net').toString());
  return llms_txt;
};
