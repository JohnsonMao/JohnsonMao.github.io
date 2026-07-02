import { describe, expect, it, vi } from 'vitest'
import type { Locale } from '@/i18n'

import {
  getBestEntry,
  getCollectionEntry,
  getEntriesByTag,
  getNotesForLocale,
  getPaginatedArticles,
  getRelatedEntries,
  getSortedCollectionList,
  type LocalizedCollection,
  parseEntryId,
} from './content'

const blogEntries = [
  {
    id: 'post-1.zh-TW',
    data: { title: 'Post 1 ZH', pubDate: new Date('2024-01-01'), draft: false, tags: ['react'] },
  },
  {
    id: 'post-1.en',
    data: { title: 'Post 1 EN', pubDate: new Date('2024-01-01'), draft: false, tags: ['react'] },
  },
  {
    id: 'post-2.zh-TW',
    data: { title: 'Post 2 ZH', pubDate: new Date('2024-01-02'), draft: false, tags: ['react'] },
  },
  {
    id: 'post-3.zh-TW',
    data: { title: 'Post 3 ZH', pubDate: new Date('2024-01-03'), draft: false, tags: ['javascript', 'react'] },
  },
  {
    id: 'draft-post.zh-TW',
    data: { title: 'Draft Post', pubDate: new Date('2024-01-04'), draft: true, tags: ['react'] },
  },
]

const notesEntries = [
  {
    id: 'note-1.zh-TW',
    data: { title: 'Note 1 ZH', pubDate: new Date('2024-01-01') },
  },
  {
    id: 'note-2.zh-TW',
    data: { title: 'Note 2 ZH Draft', pubDate: new Date('2024-01-02'), draft: true },
  },
  {
    id: 'note-3.en',
    data: { title: 'Note 3 EN', pubDate: new Date('2024-01-03') },
  },
]

// Mock astro:content
vi.mock('astro:content', () => ({
  defineCollection: vi.fn((config) => config),
  getCollection: vi.fn(async (collection: string, filter?: (entry: unknown) => boolean) => {
    const entries = collection === 'notes' ? notesEntries : blogEntries
    return entries.filter((entry) => !filter || filter(entry))
  }),
}))

describe('content Utils', () => {
  describe('getCollectionEntry()', () => {
    it('should return exact locale entry if available', async () => {
      const entry = await getCollectionEntry('blog', 'en', 'post-1')
      expect(entry.data.title).toBe('Post 1 EN')
      expect(entry.isFallback).toBe(false)
    })

    it('should fallback to default locale if requested locale is missing', async () => {
      // post-2 only has zh-TW
      const entry = await getCollectionEntry('blog', 'en', 'post-2')
      expect(entry.locale).toBe('zh-TW')
      expect(entry.isFallback).toBe(true)
    })

    it('should throw error if entry does not exist', async () => {
      await expect(getCollectionEntry('blog', 'zh-TW', 'non-existent')).rejects.toThrow()
    })
  })

  describe('getSortedCollectionList()', () => {
    it('should return sorted entries by date descending', async () => {
      const list = await getSortedCollectionList('blog', 'zh-TW')
      // If DEV is true, draft-post is included, so it should be 4
      const expectedLength = import.meta.env.DEV ? 4 : 3
      expect(list).toHaveLength(expectedLength)

      // draft-post has date 2024-01-04, post-3 has 2024-01-03
      if (import.meta.env.DEV) {
        expect(list[0].id).toBe('draft-post')
        expect(list[1].id).toBe('post-3')
      } else {
        expect(list[0].id).toBe('post-3')
      }
    })

    it('should handle fallbacks correctly in the list', async () => {
      const list = await getSortedCollectionList('blog', 'en')
      const p2 = list.find((e) => e.id === 'post-2')
      expect(p2?.locale).toBe('zh-TW')
      expect(p2?.isFallback).toBe(true)
    })
  })

  describe('getEntriesByTag()', () => {
    it('should group entries by tag', async () => {
      const tagMap = await getEntriesByTag('zh-TW')
      expect(tagMap.has('react')).toBe(true)
      expect(tagMap.has('javascript')).toBe(true)

      const reactPosts = tagMap.get('react')
      expect(reactPosts?.some((p) => p.id === 'post-1')).toBe(true)
      expect(reactPosts?.some((p) => p.id === 'post-3')).toBe(true)
      if (import.meta.env.DEV) {
        expect(reactPosts?.some((p) => p.id === 'draft-post')).toBe(true)
      }
    })
  })

  describe('getRelatedEntries()', () => {
    it('should return related entries based on tag overlap', async () => {
      // post-3 has ['javascript', 'react']
      // post-1 has ['react']
      // post-2 has ['react']
      // post-3 should relate to post-1 and post-2
      const list = await getSortedCollectionList('blog', 'zh-TW')
      const post3 = list.find((e) => e.id === 'post-3')
      if (!post3) throw new Error('post-3 not found')

      const related = await getRelatedEntries('blog', post3)
      // Expect post-2 and post-1 (sorted by date descending since scores are equal)
      // If draft-post is included, it also has 'react', so it should be there too
      const expectedRelatedIds = import.meta.env.DEV ? ['draft-post', 'post-2', 'post-1'] : ['post-2', 'post-1']

      expect(related.map((e) => e.id)).toEqual(expectedRelatedIds)
    })

    it('should handle entries with no tags', async () => {
      const list = await getSortedCollectionList('blog', 'zh-TW')
      const post3 = list.find((e) => e.id === 'post-3')
      if (!post3) throw new Error('post-3 not found')
      const entryNoTags = { ...post3, tags: [] }

      const related = await getRelatedEntries('blog', entryNoTags)
      expect(related.length).toBeGreaterThan(0)
      expect(related.map((e) => e.id)).not.toContain('post-3')
    })
  })

  describe('parseEntryId()', () => {
    it('should parse "post.locale" standalone ID correctly', () => {
      const { seriesId, slug, locale } = parseEntryId('hello-world.zh-TW')
      expect(seriesId).toBeUndefined()
      expect(slug).toBe('hello-world')
      expect(locale).toBe('zh-TW')
    })

    it('should parse "series/post.locale" ID with numerical prefix', () => {
      const { seriesId, slug, locale } = parseEntryId('my-series/01-getting-started.en')
      expect(seriesId).toBe('my-series')
      expect(slug).toBe('my-series/01-getting-started')
      expect(locale).toBe('en')
    })

    it('should parse "series/post.locale" ID without numerical prefix', () => {
      const { seriesId, slug, locale } = parseEntryId('my-series/intro.en')
      expect(seriesId).toBe('my-series')
      expect(slug).toBe('my-series/intro')
      expect(locale).toBe('en')
    })

    it('should throw for ID with no dot (missing locale suffix)', () => {
      expect(() => parseEntryId('standalone-slug')).toThrow(
        'Invalid entry ID format: standalone-slug. Expected "post.locale" or "series/post.locale".',
      )
    })

    it('should throw for series/post ID with no dot (missing locale suffix)', () => {
      expect(() => parseEntryId('my-series/some-slug')).toThrow(
        'Invalid entry ID format: my-series/some-slug. Expected "post.locale" or "series/post.locale".',
      )
    })

    it('should throw for ID with invalid locale suffix', () => {
      expect(() => parseEntryId('post.invalid-locale')).toThrow(
        'Invalid locale: invalid-locale in entry post.invalid-locale',
      )
    })
  })

  describe('getBestEntry()', () => {
    const mockEntries = new Map<Locale, LocalizedCollection<'blog'>>([
      ['zh-TW', { id: 'post', locale: 'zh-TW', data: { title: '中文' } }],
      ['en', { id: 'post', locale: 'en', data: { title: 'English' } }],
    ] as unknown as [Locale, LocalizedCollection<'blog'>][])

    it('should pick the exact locale if available', () => {
      const entry = getBestEntry(mockEntries, ['en', 'zh-TW'])
      expect(entry.locale).toBe('en')
    })

    it('should fallback to next available locale in priority list', () => {
      const partialEntries = new Map<Locale, LocalizedCollection<'blog'>>([
        ['zh-TW', { id: 'post', locale: 'zh-TW', data: { title: '中文' } }],
      ] as unknown as [Locale, LocalizedCollection<'blog'>][])
      const entry = getBestEntry(partialEntries, ['en', 'zh-TW'])
      expect(entry.locale).toBe('zh-TW')
    })

    it('should fallback to first available if priority list fails', () => {
      const entry = getBestEntry(mockEntries, ['ja' as unknown as Locale])
      expect(entry).toBeDefined()
      expect(['zh-TW', 'en']).toContain(entry.locale)
    })
  })

  describe('getPaginatedArticles()', () => {
    const mockArticles = Array.from({ length: 25 }, (_, i) => ({
      id: `post-${i}`,
    })) as unknown as LocalizedCollection<'blog'>[]

    it('should split articles into pages of default size (10)', () => {
      const pages = getPaginatedArticles(mockArticles)
      expect(pages).toHaveLength(3)
      expect(pages[0]).toHaveLength(10)
      expect(pages[1]).toHaveLength(10)
      expect(pages[2]).toHaveLength(5)
    })

    it('should split articles into pages of custom size', () => {
      const pages = getPaginatedArticles(mockArticles, 5)
      expect(pages).toHaveLength(5)
      expect(pages[0]).toHaveLength(5)
    })

    it('should return empty array for empty input', () => {
      const pages = getPaginatedArticles([])
      expect(pages).toHaveLength(0)
    })
  })

  describe('getNotesForLocale()', () => {
    it('should return notes for the requested locale sorted by pubDate descending', async () => {
      const notes = await getNotesForLocale('zh-TW')
      // DEV: includes drafts (note-1 + note-2 draft) = 2
      // PROD: excludes drafts (note-1 only) = 1
      const expectedLength = import.meta.env.DEV ? 2 : 1
      expect(notes).toHaveLength(expectedLength)
      if (import.meta.env.DEV) {
        // note-2 has pubDate 2024-01-02 (newer), note-1 has 2024-01-01
        expect(notes[0].id).toBe('note-2')
        expect(notes[1].id).toBe('note-1')
      } else {
        expect(notes[0].id).toBe('note-1')
      }
    })

    it('should only return notes matching the requested locale', async () => {
      const notes = await getNotesForLocale('en')
      expect(notes).toHaveLength(1)
      expect(notes[0].id).toBe('note-3')
      expect(notes[0].locale).toBe('en')
    })

    it('should return empty array when no notes exist in collection', async () => {
      const { getCollection } = await import('astro:content')
      vi.mocked(getCollection).mockResolvedValueOnce([])
      const notes = await getNotesForLocale('zh-TW')
      expect(notes).toHaveLength(0)
    })
  })
})
