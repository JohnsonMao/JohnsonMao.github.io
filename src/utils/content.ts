import type { CollectionEntry } from 'astro:content'
import type { TagId } from '@/data/tags'
import type { Locale } from '@/i18n'
import { getCollection } from 'astro:content'
import { tags as tagRegistry } from '@/data/tags'
import { getLocalePriority, isLocale, normalizeLocale } from '@/i18n'

const selectedCollections = ['blog'] as const

export type SelectedCollection = typeof selectedCollections[number]

/**
 * Shared metadata structure defined in _meta.ts files.
 */
export interface SharedMeta {
  tags?: TagId[]
  [key: string]: unknown
}

export type LocalizedCollection<K extends SelectedCollection> = CollectionEntry<K> & {
  locale: Locale
  isFallback?: boolean
  seriesId?: string
  tags?: TagId[]
}

interface LocalizedCollectionGroup<K extends SelectedCollection> {
  id: string
  entries: Map<Locale, LocalizedCollection<K>>
}

// Automatically load _meta.ts files to share tags/metadata across locales
const metaFiles = import.meta.glob<SharedMeta>('../content/blog/**/_meta.ts', { eager: true, import: 'default' })

/**
 * Retrieves shared metadata for a given path, safely typed.
 */
function getSharedMetadata(path: string): SharedMeta {
  const dir = path.includes('/') ? path.split('/').slice(0, -1).join('/') : ''
  const metaKey = `../content/blog/${dir}/_meta.ts`
  return metaFiles[metaKey] || {}
}

/**
 * Validates tags against the master registry at build-time to prevent typos.
 */
export function validateTags(id: string, tags?: TagId[]) {
  if (!tags)
    return
  tags.forEach((tag) => {
    if (!(tag in tagRegistry)) {
      throw new Error(`[Content Error] Unregistered tag ID: "${tag}" found in ${id}. Please register it in src/data/tags.ts.`)
    }
  })
}

/**
 * Parses raw ID into seriesId and canonical slug.
 * Strips numerical prefixes (e.g. '01-') for clean URLs.
 */
export function parseEntryId(id: string) {
  const parts = id.split('/')
  const locale = normalizeLocale(parts.at(-1)!)

  if (!isLocale(locale)) {
    throw new Error(`Invalid locale: ${locale} in entry ${id}`)
  }

  switch (parts.length) {
    case 2:
      return { locale, seriesId: undefined, slug: parts[0] }
    case 3:
      return { locale, seriesId: parts[0], slug: `${parts[0]}/${parts[1]}` }
    default:
      throw new Error(`Invalid entry ID format: ${id}. Expected "slug/locale" or "series/slug/locale".`)
  }
}

export function getBaseId(id: string): string {
  return parseEntryId(id).slug
}

/**
 * Picks the best language version based on the locale priority list.
 */
export function getBestEntry<K extends SelectedCollection>(
  entries: Map<Locale, LocalizedCollection<K>>,
  priority: Locale[],
): LocalizedCollection<K> {
  for (const locale of priority) {
    const entry = entries.get(locale)
    if (entry)
      return entry
  }
  return [...entries.values()][0]!
}

/**
 * Loads, groups, and merges shared metadata for a collection.
 * This is the central processing pipeline for localized content.
 */
async function getGroupedCollection<K extends SelectedCollection>(
  collection: K,
): Promise<Map<string, LocalizedCollectionGroup<K>>> {
  const all = await getCollection(collection, ({ data }) => import.meta.env.DEV || data.draft !== true)
  const collectionMap = new Map<string, LocalizedCollectionGroup<K>>()

  all.forEach((entry) => {
    const { seriesId, slug, locale } = parseEntryId(entry.id)
    const sharedMeta = getSharedMetadata(entry.id)
    validateTags(entry.id, sharedMeta.tags)

    const localizedEntry: LocalizedCollection<K> = {
      ...entry,
      id: slug,
      locale,
      seriesId,
      tags: sharedMeta.tags,
    }

    const group = collectionMap.get(slug) || { id: slug, entries: new Map() }
    group.entries.set(locale, localizedEntry)
    collectionMap.set(slug, group)
  })

  return collectionMap
}

/**
 * Resolves a single entry with i18n fallback support.
 */
export async function getCollectionEntry<K extends SelectedCollection>(
  collection: K,
  locale: Locale,
  id: string,
): Promise<LocalizedCollection<K>> {
  const collectionMap = await getGroupedCollection(collection)
  const group = collectionMap.get(id)
  if (!group)
    throw new Error(`Entry ${id} not found in collection ${collection}`)

  const entry = getBestEntry<K>(group.entries, getLocalePriority(locale))
  return { ...entry, isFallback: entry.locale !== locale }
}

/**
 * Returns unique articles for a locale, applying fallbacks where translations are missing.
 */
export async function getSortedCollectionList<K extends SelectedCollection>(
  collection: K,
  locale: Locale,
): Promise<LocalizedCollection<K>[]> {
  const collectionMap = await getGroupedCollection(collection)
  const priority = getLocalePriority(locale)

  return Array.from(collectionMap.values(), (group) => {
    const entry = getBestEntry<K>(group.entries, priority)
    return { ...entry, isFallback: locale !== entry.locale }
  })
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
}

/**
 * Aggregates tags while accounting for fallback versions visible in the current locale.
 */
export async function getEntriesByTag(locale: Locale) {
  const tagMap: Map<TagId, LocalizedCollection<SelectedCollection>[]> = new Map()

  for (const col of selectedCollections) {
    const entries = await getSortedCollectionList(col, locale)
    entries.forEach((entry) => {
      entry.tags?.forEach((tag) => {
        const list = tagMap.get(tag) || []
        list.push(entry)
        tagMap.set(tag, list)
      })
    })
  }

  return tagMap
}

/**
 * Calculates related articles based on tag overlap score.
 */
export async function getRelatedEntries<K extends SelectedCollection>(
  collection: K,
  entry: LocalizedCollection<K>,
  maxCount: number = 3,
): Promise<LocalizedCollection<K>[]> {
  const allEntries = await getSortedCollectionList(collection, entry.locale)
  const currentTags = entry.tags ?? []

  if (currentTags.length === 0) {
    return allEntries.filter(e => e.id !== entry.id).slice(0, maxCount)
  }

  return allEntries
    .filter(e => e.id !== entry.id)
    .map((e) => {
      const commonTags = (e.tags ?? []).filter(tag => currentTags.includes(tag))
      return { entry: e, score: commonTags.length }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || b.entry.data.pubDate.getTime() - a.entry.data.pubDate.getTime())
    .slice(0, maxCount)
    .map(item => item.entry)
}
