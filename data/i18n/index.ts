export const defaultLocale = 'zh';
export const locales = [defaultLocale, 'en'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof import('./locales/zh.json');

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  zh: () => import('./locales/zh.json'),
  en: () => import('./locales/en.json'),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export const isLocale = (language: string): language is Locale =>
  locales.findIndex((locale) => locale === language) > -1;
