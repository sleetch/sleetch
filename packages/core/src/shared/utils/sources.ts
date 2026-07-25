import { get_configuration, type parsed_ladoc_configuration } from '@/configuration';

export const get_sources = async (_language?: string) => {
  const configuration = await get_configuration();
  const language = _language && configuration.sources.find((source) => source.language == _language) ? _language : configuration.languages.default;
  const sources = configuration.sources.filter((source) => source.language == _language);
  return { language, sources };
};
