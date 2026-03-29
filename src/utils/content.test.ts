import type { Locale } from '@/i18n'
import { describe, expect, it } from 'vitest'
import { getBestEntry, parseEntryId, validateTags } from './content'

describe('content Utils', () => {
  describe('validateTags()', () => {
    it('should not throw for registered tags', () => {
      expect(() => validateTags('test-post', ['astro', 'demo'])).not.toThrow()
    })

    it('should throw error for unregistered tags', () => {
      expect(() => validateTags('test-post', ['non-existent' as any])).toThrow(/Unregistered tag ID/)
    })

    it('should handle undefined tags gracefully', () => {
      expect(() => validateTags('test-post', undefined)).not.toThrow()
    })
  })

  describe('parseEntryId()', () => {
    it('should parse "slug/locale" ID correctly', () => {
      const { seriesId, slug, locale } = parseEntryId('hello-world/zh-TW')
      expect(seriesId).toBeUndefined()
      expect(slug).toBe('hello-world')
      expect(locale).toBe('zh-TW')
    })

    it('should parse "series/slug/locale" ID correctly and preserve numerical prefix with series path', () => {
      const { seriesId, slug, locale } = parseEntryId('my-series/01-getting-started/en')
      expect(seriesId).toBe('my-series')
      expect(slug).toBe('my-series/01-getting-started')
      expect(locale).toBe('en')
    })

    it('should parse "series/slug/locale" ID without numerical prefix with series path', () => {
      const { seriesId, slug, locale } = parseEntryId('my-series/intro/en')
      expect(seriesId).toBe('my-series')
      expect(slug).toBe('my-series/intro')
      expect(locale).toBe('en')
    })

    it('should throw error for invalid ID format with only one part', () => {
      expect(() => parseEntryId('standalone-slug')).toThrow(
        'Invalid locale: standalone-slug in entry standalone-slug',
      )
    })

    it('should throw error for invalid ID format with missing locale', () => {
      expect(() => parseEntryId('my-series/some-slug')).toThrow(
        'Invalid locale: some-slug in entry my-series/some-slug',
      )
    })

    it('should throw error for invalid locale', () => {
      expect(() => parseEntryId('hello-world/invalid-lang')).toThrow(
        'Invalid locale: invalid-Lang in entry hello-world/invalid-lang',
      )
    })
  })

  describe('getBestEntry()', () => {
    const mockEntries = new Map<Locale, any>([
      ['zh-TW', { id: 'post', locale: 'zh-TW', data: { title: '中文' } }],
      ['en', { id: 'post', locale: 'en', data: { title: 'English' } }],
    ])

    it('should pick the exact locale if available', () => {
      const entry = getBestEntry(mockEntries, ['en', 'zh-TW'])
      expect(entry.locale).toBe('en')
    })

    it('should fallback to next available locale in priority list', () => {
      const partialEntries = new Map<Locale, any>([
        ['zh-TW', { id: 'post', locale: 'zh-TW', data: { title: '中文' } }],
      ])
      const entry = getBestEntry(partialEntries, ['en', 'zh-TW'])
      expect(entry.locale).toBe('zh-TW')
    })

    it('should fallback to first available if priority list fails', () => {
      const entry = getBestEntry(mockEntries, ['ja' as any])
      expect(entry).toBeDefined()
      expect(['zh-TW', 'en']).toContain(entry.locale)
    })
  })
})
