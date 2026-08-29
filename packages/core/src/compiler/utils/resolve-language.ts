import { get_configuration } from '@/configuration';

export const resolve_language = (_language?: string) => {
    const configuration = get_configuration();
    if (!_language || (_language && !configuration.sources.some((source) => source.language === _language))) {
        return configuration.languages.default;
    } else {
        return _language;
    }
};
