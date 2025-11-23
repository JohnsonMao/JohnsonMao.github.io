import { defineRouting } from 'next-intl/routing';

const defaultLocale = 'zh';

export const routing = defineRouting({
  locales: [defaultLocale, 'en'],
  defaultLocale,
  localePrefix: 'as-needed',
});

export const languageOptions: {
  value: (typeof routing.locales)[number];
  label: string;
}[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
];
