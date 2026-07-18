import type { TagId } from '@/content.config'
import { TAG_IDS } from '@/content.config'
import type { I18nMessageModules } from '@/glob.loader'
import { getMessageModules } from '@/glob.loader'

interface Messages {
  tags?: {
    title?: string
    description?: string
    count?: string
    registry?: Record<
      string,
      {
        name: string
        description: string
      }
    >
  }
  [key: string]: unknown
}

const PREFERRED_DEFAULT_LOCALE = 'zh-TW'
const SUPPORTED_LOCALES = ['zh-TW', 'en'] as const

/** BCP 47 hreflang tags (used in `<link rel="alternate" hreflang>`) */
const HREFLANG_MAP: Record<string, string> = {
  'zh-TW': 'zh-Hant',
  en: 'en',
}

/** Open Graph locale format (used in `og:locale` / `og:locale:alternate`) */
const OG_LOCALE_MAP: Record<string, string> = {
  'zh-TW': 'zh_TW',
  en: 'en_US',
}

/** Returns the hreflang value for the given locale, falling back to the locale itself */
export function getHreflang(locale: string): string {
  return HREFLANG_MAP[locale] ?? locale
}

/** Returns the OG locale value for the given locale, falling back to replacing "-" with "_" */
export function getOgLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? locale.replace('-', '_')
}
export type Locale = (typeof SUPPORTED_LOCALES)[number]
const SUPPORTED_LOCALE_SET = new Set<Locale>(SUPPORTED_LOCALES)
const MESSAGE_MODULE_RE = /\/([^/]+)\/([^/]+)\.json$/

function toRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>
  return {}
}

function mergeRecords(base: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const output: Record<string, unknown> = { ...base }
  Object.entries(source).forEach(([key, value]) => {
    const existing = output[key]
    if (
      existing &&
      typeof existing === 'object' &&
      !Array.isArray(existing) &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      output[key] = mergeRecords(existing as Record<string, unknown>, value as Record<string, unknown>)
      return
    }
    output[key] = value
  })
  return output
}

function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALE_SET.has(locale as Locale)
}

interface CreateI18nDataOptions {
  messageModules?: I18nMessageModules
  preferredDefaultLocale?: Locale
  tagIds?: readonly TagId[]
  isDev?: boolean
  warn?: (message: string) => void
}

interface I18nData {
  defaultLocale: Locale
  locales: Locale[]
  tagIds: TagId[]
  messages: Record<Locale, Messages>
}

export function createI18nData(options: CreateI18nDataOptions = {}): I18nData {
  const messageModules = options.messageModules ?? getMessageModules()
  const preferredDefaultLocale = options.preferredDefaultLocale ?? PREFERRED_DEFAULT_LOCALE
  const resolvedTagIds = (options.tagIds ?? TAG_IDS) as TagId[]

  const messageEntries = Object.entries(messageModules)
    .map(([path, mod]) => {
      const match = path.match(MESSAGE_MODULE_RE)
      if (!match) return null
      const [, locale, moduleName] = match
      if (!isSupportedLocale(locale)) {
        throw new Error(
          `[i18n] Unsupported locale "${locale}" in "${path}". Supported locales: ${SUPPORTED_LOCALES.join(', ')}`,
        )
      }
      return [locale, moduleName, toRecord(mod.default)] as const
    })
    .filter((entry): entry is readonly [Locale, string, Record<string, unknown>] => entry !== null)

  if (messageEntries.length === 0) {
    throw new Error('[i18n] No locale files found under src/i18n/messages/*/*.json')
  }

  const localeSet = new Set<Locale>(messageEntries.map(([locale]) => locale))
  const defaultLocale: Locale = localeSet.has(preferredDefaultLocale)
    ? preferredDefaultLocale
    : (messageEntries[0]?.[0] as Locale)
  const locales: Locale[] = [defaultLocale, ...[...localeSet].filter((locale) => locale !== defaultLocale)]

  const messagesByLocale = new Map<Locale, Record<string, unknown>>()
  messageEntries.forEach(([locale, moduleName, moduleData]) => {
    const current = messagesByLocale.get(locale) ?? {}
    messagesByLocale.set(locale, mergeRecords(current, { [moduleName]: moduleData }))
  })

  function buildTagRegistry(locale: Locale): Record<string, { name: string; description: string }> {
    const getRawRegistry = (loc: Locale): Record<string, unknown> => {
      const msgs = messagesByLocale.get(loc) ?? {}
      return toRecord(toRecord(msgs.tags).registry)
    }

    const localeRegistry = getRawRegistry(locale)
    const fallbackRegistry = getRawRegistry(defaultLocale)
    const registry: Record<string, { name: string; description: string }> = {}

    resolvedTagIds.forEach((tagId) => {
      const entry = localeRegistry[tagId] ?? fallbackRegistry[tagId]
      if (
        entry &&
        typeof entry === 'object' &&
        'name' in entry &&
        typeof (entry as Record<string, unknown>).name === 'string'
      ) {
        registry[tagId] = entry as { name: string; description: string }
        return
      }
      registry[tagId] = { name: tagId, description: tagId }
    })

    return registry
  }

  const messages = locales.reduce<Record<Locale, Messages>>(
    (acc, locale) => {
      const localeMessages = (messagesByLocale.get(locale) ?? {}) as Messages
      const tags = toRecord(localeMessages.tags) as Messages['tags']

      acc[locale] = {
        ...localeMessages,
        tags: {
          ...tags,
          registry: buildTagRegistry(locale),
        },
      }
      return acc
    },
    {} as Record<Locale, Messages>,
  )

  const isDev = options.isDev ?? import.meta.env.DEV
  if (isDev) {
    const defaultTagSet = new Set<string>(resolvedTagIds)
    const warn = options.warn ?? console.warn

    locales.forEach((locale) => {
      const msgs = messagesByLocale.get(locale) ?? {}
      const localeTagIds = Object.keys(toRecord(toRecord(msgs.tags).registry))
      const missingTags = resolvedTagIds.filter((tag) => !localeTagIds.includes(tag))
      const extraTags = localeTagIds.filter((tag) => !defaultTagSet.has(tag))

      if (missingTags.length > 0 || extraTags.length > 0) {
        warn(
          `[i18n] Tag registry mismatch in locale "${locale}". Missing: [${missingTags.join(', ')}], Extra: [${extraTags.join(', ')}]`,
        )
      }
    })
  }

  return {
    defaultLocale,
    locales,
    tagIds: resolvedTagIds,
    messages,
  }
}

const i18nData = createI18nData()

export const defaultLocale: Locale = i18nData.defaultLocale
export const locales: Locale[] = i18nData.locales
export const tagIds = i18nData.tagIds
const messages: Record<Locale, Messages> = i18nData.messages

export function normalizeLocale(locale: string): string {
  try {
    return new Intl.Locale(locale).toString()
  } catch {
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
  const seen = new Set<Locale>()
  const ordered: Locale[] = []
  const add = (locale: Locale) => {
    if (!seen.has(locale)) {
      seen.add(locale)
      ordered.push(locale)
    }
  }

  add(current)
  add(defaultLocale)
  locales.forEach(add)

  return ordered
}

function getNested(obj: unknown, key: string): string | undefined {
  const parts = key.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === 'string' ? current : undefined
}

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const data = messages[locale]
  const value = getNested(data, key)
  if (value == null) return key
  if (!vars) return value
  return Object.entries(vars).reduce((s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), v.toString()), value)
}
