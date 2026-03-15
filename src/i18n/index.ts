import en from './en.json'
import zhTW from './zh-TW.json'

export type Locale = 'en' | 'zh-TW'
export const defaultLocale: Locale = 'zh-TW'
export const locales: Locale[] = ['zh-TW', 'en']

export function normalizeLocale(locale: string) {
  try {
    return new Intl.Locale(locale).toString()
  }
  catch {
    return locale
  }
}

export function isLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && locales.includes(locale as Locale)
}

/**
 * Validates and returns the current locale with a fallback to defaultLocale.
 */
export function getLocale(currentLocale: unknown): Locale {
  return isLocale(currentLocale) ? currentLocale : defaultLocale
}

export function generateStaticLocalePaths() {
  return locales.map((locale) => {
    const lang = locale === defaultLocale ? undefined : locale
    return { params: { lang } }
  })
}

/**
 * Get the locale priority order based on the current locale
 */
export function getLocalePriority(current: Locale): Locale[] {
  if (current === 'en')
    return ['en', 'zh-TW']
  return ['zh-TW', 'en']
}

export function getLocaleLabel(locale: Locale): string {
  return locale === 'en' ? 'EN' : '繁中'
}

const messages: Record<Locale, Record<string, unknown>> = {
  'en': en as Record<string, unknown>,
  'zh-TW': zhTW as Record<string, unknown>,
}

function getNested(obj: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object')
      return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === 'string' ? current : undefined
}

export function t(locale: Locale, key: string, vars?: Record<string, string>): string {
  const data = messages[locale]
  const value = getNested(data as Record<string, unknown>, key)
  if (value == null)
    return key
  if (!vars)
    return value
  return Object.entries(vars).reduce((s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), v), value)
}
