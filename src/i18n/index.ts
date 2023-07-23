import i18n from 'i18next';
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh-TW/common.json';

export const defaultLocale = 'zh-TW';
export const locales = [defaultLocale, 'en'] as const;

i18n.init({
  fallbackLng: 'en',
  resources: {
    en: {
      common: enCommon,
    },
    'zh-TW': {
      common: zhCommon,
    },
  },
});

export default i18n;
