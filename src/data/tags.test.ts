import { describe, expect, it } from 'vitest'
import { getTagDisplay, tags } from './tags'

describe('tag Registry', () => {
  it('should return the correct localized name', () => {
    expect(getTagDisplay('astro', 'zh-TW')).toBe('Astro')
    expect(getTagDisplay('demo', 'zh-TW')).toBe('示範')
    expect(getTagDisplay('demo', 'en')).toBe('Demo')
  })

  it('should fallback to zh-TW if locale is not supported', () => {
    expect(getTagDisplay('demo', 'ja' as any)).toBe('示範')
  })

  it('should return the ID if tag is not registered', () => {
    expect(getTagDisplay('unknown-tag' as any, 'zh-TW')).toBe('unknown-tag')
  })

  it('should have a consistent structure for all registered tags', () => {
    Object.entries(tags).forEach(([_, translations]) => {
      expect(translations).toHaveProperty('zh-TW')
      expect(translations).toHaveProperty('en')
    })
  })
})
