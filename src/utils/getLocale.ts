import { Locale, isLocale } from '~/i18n';

/**
 * The function get language locale code from the input.
 *
 * Ensures that the selected locale code matches one of the supported locale codes in the ~/i18n file.
 *
 * @example
 * import getLocale from '@/utils/getLocale';
 *
 * getLocale('zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7'); // 'zh-TW'
 * getLocale('/en/pathname'); // 'en'
 * getLocale('/pathname', 'zh-TW'); // 'zh-TW'
 * getLocale(); // undefined
 */
function getLocale(
  acceptLanguage: string | null,
  defaultLocale: Locale
): Locale;

function getLocale(
  acceptLanguage?: string | null,
  defaultLocale?: Locale
): Locale | undefined;

function getLocale(
  acceptLanguage?: string | null,
  defaultLocale?: Locale
): Locale | undefined {
  if (typeof acceptLanguage !== 'string') return defaultLocale;

  // match accept language
  // e.g. zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7 => [ 'zh-TW', 'zh', 'en-US', 'en' ]
  const languageRegex = /([\w]{2,3}-?[\w]{0,3})/gm;
  const languages = acceptLanguage.match(languageRegex);
  const selectedLocale = languages?.find(isLocale);

  return selectedLocale || defaultLocale;
}

export default getLocale;
