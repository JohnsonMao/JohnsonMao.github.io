export const DEFAULT_LOCALE = 'zh-TW';
export const locales = ['en', DEFAULT_LOCALE] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  'zh-TW': () => import('./locales/zh-TW').then((module) => module.default),
  en: () => import('./locales/en').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export const isLocale = (language: string): language is Locale =>
  locales.findIndex((locale) => locale === language) > -1;
