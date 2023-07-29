export const defaultLocale = 'zh-TW';
export const locales = [defaultLocale, 'en'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  'zh-TW': () => import('~/locales/zh-TW/common.json').then((module) => module.default),
  en: () => import('~/locales/en/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
