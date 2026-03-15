import type { Locale } from '@/i18n'

export const tags = {
  astro: {
    'zh-TW': 'Astro',
    'en': 'Astro',
  },
  i18n: {
    'zh-TW': '多語系',
    'en': 'i18n',
  },
  test: {
    'zh-TW': '測試',
    'en': 'Test',
  },
  demo: {
    'zh-TW': '示範',
    'en': 'Demo',
  },
  intro: {
    'zh-TW': '介紹',
    'en': 'Introduction',
  },
  fallback: {
    'zh-TW': '回退機制',
    'en': 'Fallback',
  },
} as const

export type TagId = keyof typeof tags

/**
 * 取得翻譯後的標籤名稱
 */
export function getTagDisplay(tagId: TagId, locale: Locale): string {
  const tag = tags[tagId]
  if (!tag)
    return tagId
  return tag[locale] || Object.values(tag)[0] || tagId
}
