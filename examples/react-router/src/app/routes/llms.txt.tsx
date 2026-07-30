import { get_llms } from '@ladoc/server';

export const loader = async () => {
  const llms_txt = await get_llms(({ path }) => 'https://ladoc.net' + '/documentation' + path);
  return llms_txt;
};
