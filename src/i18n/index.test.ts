import { describe, expect, it } from 'vitest'
import { createI18nData, defaultLocale, getLocalePriority, locales, t, tagIds } from './index'

describe('i18n t()', () => {
  it('auto-loads locales from messages directory', () => {
    expect(locales.length).toBeGreaterThan(0)
    expect(locales).toContain('en')
    expect(locales).toContain('zh-TW')
  })

  it('uses zh-TW as default locale when present', () => {
    expect(defaultLocale).toBe('zh-TW')
  })

  it('returns nested key for en', () => {
    expect(t('en', 'nav.blog')).toBe('Blog')
  })

  it('returns nested key for zh-TW', () => {
    expect(t('zh-TW', 'nav.blog')).toBe('文章')
  })

  it('replaces one or more variables in message', () => {
    expect(t('en', 'blog.readingTime', { minutes: 5 })).toBe('5 min read')
  })

  it('returns key when translation is missing', () => {
    expect(t('en', 'missing.key')).toBe('missing.key')
  })

  it('returns value without substitution when vars is not provided', () => {
    expect(t('en', 'blog.readingTime')).toBe('{minutes} min read')
  })

  it('builds locale priority dynamically', () => {
    expect(getLocalePriority('en')[0]).toBe('en')
    expect(getLocalePriority('zh-TW')[0]).toBe('zh-TW')
    expect(getLocalePriority('en')).toContain(defaultLocale)
  })

  it('derives tag ids from default locale registry', () => {
    expect(tagIds.length).toBeGreaterThan(0)
    expect(tagIds).toContain('react')
  })

  it('supports injecting module sources for easier testing', () => {
    const data = createI18nData({
      messageModules: {
        './messages/en/nav.json': { default: { blog: 'Blog' } },
        './messages/zh-TW/nav.json': { default: { blog: '文章' } },
        './messages/en/tags.json': { default: { registry: { react: { name: 'React', description: 'React en' } } } },
        './messages/zh-TW/tags.json': { default: { registry: { react: { name: 'React', description: 'React zh' } } } },
      },
      isDev: false,
    })

    expect(data.defaultLocale).toBe('zh-TW')
    expect(data.locales).toEqual(['zh-TW', 'en'])
    expect((data.messages.en as { nav: { blog: string } }).nav.blog).toBe('Blog')
    expect(
      (data.messages['zh-TW'] as { tags: { registry: Record<string, { name: string }> } }).tags.registry.react.name,
    ).toBe('React')
  })

  it('throws when injected message source is empty', () => {
    expect(() =>
      createI18nData({
        messageModules: {},
        isDev: false,
      }),
    ).toThrow('[i18n] No locale files found under src/i18n/messages/*/*.json')
  })
})
