import type { TagId } from '@/content.config'
import type { I18nMessageModules, TagTranslationModules, TagTranslations } from '@/glob.loader'

import { TAG_IDS } from '@/content.config'
import { getMessageModules, getTagTranslationModules } from '@/glob.loader'

// Re-export for backward compatibility
export type { TagId }

interface Messages {
  tags?: {
    title?: string
    description?: string
    count?: string
    registry?: Record<string, {
      name: string
      description: string
    }>
  }
  [key: string]: unknown
}

const PREFERRED_DEFAULT_LOCALE = 'zh-TW'
const MESSAGE_MODULE_RE = /\/([^/]+)\/([^/]+)\.json$/
const TAG_TRANSLATION_RE = /\/([^/]+)\.json$/

function toRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>
  return {}
}

function mergeRecords(base: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const output: Record<string, unknown> = { ...base }
  Object.entries(source).forEach(([key, value]) => {
    const existing = output[key]
    if (
      existing
      && typeof existing === 'object'
      && !Array.isArray(existing)
      && value
      && typeof value === 'object'
      && !Array.isArray(value)
    ) {
      output[key] = mergeRecords(existing as Record<string, unknown>, value as Record<string, unknown>)
      return
    }
    output[key] = value
  })
  return output
}

export type Locale = string

interface CreateI18nDataOptions {
  messageModules?: I18nMessageModules
  tagTranslationModules?: TagTranslationModules
  preferredDefaultLocale?: string
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
  const tagTranslationModules = options.tagTranslationModules ?? getTagTranslationModules()
  const preferredDefaultLocale = options.preferredDefaultLocale ?? PREFERRED_DEFAULT_LOCALE
  const resolvedTagIds = (options.tagIds ?? TAG_IDS) as TagId[]

  const messageEntries = Object.entries(messageModules)
    .map(([path, mod]) => {
      const match = path.match(MESSAGE_MODULE_RE)
      if (!match)
        return null
      const [, locale, moduleName] = match
      return [locale, moduleName, toRecord(mod.default)] as const
    })
    .filter((entry): entry is readonly [string, string, Record<string, unknown>] => entry !== null)

  if (messageEntries.length === 0) {
    throw new Error('[i18n] No locale files found under src/i18n/messages/*/*.json')
  }

  const localeSet = new Set(messageEntries.map(([locale]) => locale))
  const defaultLocale: Locale = localeSet.has(preferredDefaultLocale)
    ? preferredDefaultLocale
    : messageEntries[0]![0]
  const locales: Locale[] = [
    defaultLocale,
    ...[...localeSet].filter(locale => locale !== defaultLocale),
  ]

  const messagesByLocale = new Map<Locale, Record<string, unknown>>()
  messageEntries.forEach(([locale, moduleName, moduleData]) => {
    const current = messagesByLocale.get(locale) ?? {}
    messagesByLocale.set(locale, mergeRecords(current, { [moduleName]: moduleData }))
  })

  const tagTranslationsByLocale = Object.entries(tagTranslationModules)
    .map(([path, mod]) => {
      const locale = path.match(TAG_TRANSLATION_RE)?.[1]
      if (!locale)
        return null
      return [locale, mod.default] as const
    })
    .filter((entry): entry is readonly [string, TagTranslations] => entry !== null)

  const tagTranslationMap: Record<string, TagTranslations> = Object.fromEntries(tagTranslationsByLocale)

  function buildTagRegistry(locale: Locale): Record<string, { name: string, description: string }> {
    const localeMap = tagTranslationMap[locale] ?? {}
    const fallbackMap = tagTranslationMap[defaultLocale] ?? {}
    const registry: Record<string, { name: string, description: string }> = {}

    resolvedTagIds.forEach((tagId) => {
      const translation = localeMap[tagId] ?? fallbackMap[tagId]
      if (!translation) {
        registry[tagId] = { name: tagId, description: tagId }
        return
      }
      registry[tagId] = translation
    })

    return registry
  }

  const messages: Record<Locale, Messages> = Object.fromEntries(
    locales.map((locale) => {
      const localeMessages = (messagesByLocale.get(locale) ?? {}) as Messages
      const tags = toRecord(localeMessages.tags) as Messages['tags']

      return [
        locale,
        {
          ...localeMessages,
          tags: {
            ...tags,
            registry: buildTagRegistry(locale),
          },
        } satisfies Messages,
      ]
    }),
  )

  const isDev = options.isDev ?? import.meta.env.DEV
  if (isDev) {
    const defaultTagSet = new Set<string>(resolvedTagIds)
    const warn = options.warn ?? console.warn

    locales.forEach((locale) => {
      const localeTagIds = Object.keys(tagTranslationMap[locale] ?? {})
      const missingTags = resolvedTagIds.filter(tag => !localeTagIds.includes(tag))
      const extraTags = localeTagIds.filter(tag => !defaultTagSet.has(tag))

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
    if (current == null || typeof current !== 'object')
      return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === 'string' ? current : undefined
}

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const data = messages[locale]
  const value = getNested(data, key)
  if (value == null)
    return key
  if (!vars)
    return value
  return Object.entries(vars).reduce((s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), v.toString()), value)
}
