import { describe, expect, it } from 'vitest'
import { getReadingTime, getReadingTimeMinutes } from './reading-time'

describe('reading Time Utils', () => {
  describe('getReadingTimeMinutes()', () => {
    it('should estimate time for English text based on characters', () => {
      // CHARS_PER_MINUTE_EN = 280
      const content = 'a'.repeat(280)
      expect(getReadingTimeMinutes(content, 'en')).toBe(1)
    })

    it('should estimate time for Chinese text', () => {
      // ~220 chars per minute for ZH
      const content = '測試'.repeat(110)
      expect(getReadingTimeMinutes(content, 'zh-TW')).toBe(1)
    })

    it('should round up to at least 1 minute', () => {
      expect(getReadingTimeMinutes('short', 'en')).toBe(1)
    })

    it('should return 0 for empty content', () => {
      expect(getReadingTimeMinutes('')).toBe(0)
    })

    it('should not count stripped code blocks toward reading time', () => {
      // Code block is stripped to a space, trimmed to empty → length 0
      expect(getReadingTimeMinutes('```const x = 1```', 'en')).toBe(0)
    })

    it('should preserve link display text after stripping markdown links', () => {
      // '[text](url)' → 'text'; only the display text counts toward reading time
      const textOnly = 'click'
      const withLink = '[click](https://example.com/very-long-url-that-should-not-count)'
      expect(getReadingTimeMinutes(withLink, 'en')).toBe(getReadingTimeMinutes(textOnly, 'en'))
    })

    it('should default to zh-TW reading rate when locale is not provided', () => {
      // 221 chars: ceil(221/220) = 2 with zh-TW rate; ceil(221/280) = 1 with en rate
      const content = 'a'.repeat(221)
      expect(getReadingTimeMinutes(content)).toBe(2)
      expect(getReadingTimeMinutes(content, 'en')).toBe(1)
    })

    it('should return multiple minutes for content exceeding one-minute threshold', () => {
      // 3 × 280 = 840 chars → exactly 3 minutes at en rate
      const content = 'a'.repeat(840)
      expect(getReadingTimeMinutes(content, 'en')).toBe(3)
    })
  })

  describe('getReadingTime()', () => {
    it('should return correct label for en', () => {
      const result = getReadingTime('content', 'en')
      expect(result.label).toContain('min read')
    })

    it('should return correct label for zh-TW', () => {
      const result = getReadingTime('內容', 'zh-TW')
      expect(result.label).toContain('分鐘')
    })

    it('should return minutes 0 with correct label for empty content', () => {
      const result = getReadingTime('', 'zh-TW')
      expect(result.minutes).toBe(0)
      expect(result.label).toBe('約 0 分鐘')
    })

    it('should return both minutes and label as a consistent result object', () => {
      // 280 chars → exactly 1 min at en rate
      const result = getReadingTime('a'.repeat(280), 'en')
      expect(result.minutes).toBe(1)
      expect(result.label).toBe('1 min read')
    })
  })
})
