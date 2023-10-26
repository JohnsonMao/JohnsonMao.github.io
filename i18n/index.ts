export const defaultLocale = 'zh';
export const locales = [defaultLocale, 'en'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  zh: () => import('./locales/zh').then((module) => module.default),
  en: () => import('./locales/en').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export const isLocale = (language: string): language is Locale =>
  locales.findIndex((locale) => locale === language) > -1;
