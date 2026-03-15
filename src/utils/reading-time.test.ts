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
  })
})
