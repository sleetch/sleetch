import { get_configuration } from '@/configuration';

export const resolve_language = async (_language?: string) => {
  const configuration = await get_configuration();
  if (!_language || (_language && !configuration.sources.some((source) => source.language == _language))) {
    return configuration.languages.default;
  } else {
    return _language;
  }
};
