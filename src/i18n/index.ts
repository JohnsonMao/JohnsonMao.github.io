import i18n from 'i18next';
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh-TW/common.json';

export const fallbackLng = 'zh-TW';

i18n.init({
  fallbackLng,
  resources: {
    en: {
      common: enCommon,
    },
    zh: {
      common: zhCommon,
    },
  },
});

export default i18n;
