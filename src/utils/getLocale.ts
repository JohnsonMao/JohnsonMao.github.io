import { Locale, DEFAULT_LOCALE, isLocale } from '~/i18n';

function getLocale(
  acceptLanguage?: string | null,
  defaultLocale: Locale = DEFAULT_LOCALE
): Locale {
  if (typeof acceptLanguage !== 'string') return defaultLocale;

  // match accept language
  // e.g. zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7 => [ 'zh-TW', 'zh', 'en-US', 'en' ]
  const languageRegex = /([\w]{2,3}-?[\w]{0,3})/gm;
  const languages = acceptLanguage.match(languageRegex);
  const selectedLocale = languages?.find(isLocale);

  return selectedLocale || defaultLocale;
}

export default getLocale;
