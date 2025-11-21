export const defaultLocale = 'zh';
export const locales = [defaultLocale, 'en'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof import('./locales/zh.json');

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  zh: () => import('./locales/zh.json'),
  en: () => import('./locales/en.json'),
};

export const isLocale = (language: string): language is Locale =>
  locales.indexOf(language as Locale) > -1;

export const getDictionary = (locale: string) =>
  isLocale(locale) ? dictionaries[locale]() : dictionaries[defaultLocale]();
