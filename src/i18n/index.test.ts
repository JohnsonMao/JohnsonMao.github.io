import { describe, expect, it, vi } from 'vitest'
import {
  createI18nData,
  defaultLocale,
  generateStaticLocalePaths,
  getLocale,
  getLocalePriority,
  isLocale,
  locales,
  normalizeLocale,
  t,
} from './index'

describe('i18n t()', () => {
  it('should return the translation for a nested key in en', () => {
    expect(t('en', 'nav.blog')).toBe('Blog')
  })

  it('should return the translation for a nested key in zh-TW', () => {
    expect(t('zh-TW', 'nav.blog')).toBe('文章')
  })

  it('should replace a single variable placeholder in a message', () => {
    expect(t('en', 'blog.readingTime', { minutes: 5 })).toBe('5 min read')
  })

  it('should return the key path when a translation is missing', () => {
    expect(t('en', 'missing.key')).toBe('missing.key')
  })

  it('should return the raw template when no vars are provided', () => {
    expect(t('en', 'blog.readingTime')).toBe('{minutes} min read')
  })

  it('should return the key when the resolved value is a non-string object', () => {
    // 'nav' maps to an object { blog, about, ... }, not a string
    // getNested returns undefined → t() falls back to returning the key
    expect(t('en', 'nav')).toBe('nav')
  })
})

describe('getLocalePriority()', () => {
  it.each(['en', 'zh-TW'] as const)('should place locale "%s" first in the priority list', (locale) => {
    expect(getLocalePriority(locale)[0]).toBe(locale)
  })

  it('should contain no duplicate locales in the priority list', () => {
    const priority = getLocalePriority('zh-TW')
    expect(priority.length).toBe(new Set(priority).size)
  })

  it('should include all supported locales in the priority list', () => {
    const priority = getLocalePriority('en')
    expect(priority).toEqual(expect.arrayContaining(locales))
  })
})

describe('normalizeLocale()', () => {
  it.each([
    ['en', 'en'],
    ['zh-TW', 'zh-TW'],
  ] as const)('should normalise the well-formed BCP 47 tag "%s" to "%s"', (input, expected) => {
    expect(normalizeLocale(input)).toBe(expected)
  })

  it('should return the input unchanged for an unrecognised locale tag', () => {
    expect(normalizeLocale('not-a-locale')).toBe('not-a-locale')
  })

  it('should return the empty string unchanged when Intl.Locale throws', () => {
    // new Intl.Locale('') throws RangeError — the catch branch returns the original value
    expect(normalizeLocale('')).toBe('')
  })
})

describe('isLocale()', () => {
  it.each(['en', 'zh-TW'] as const)('should return true for supported locale "%s"', (locale) => {
    expect(isLocale(locale)).toBe(true)
  })

  it.each(['fr', 'ja', ''])('should return false for unsupported locale string "%s"', (locale) => {
    expect(isLocale(locale)).toBe(false)
  })

  it.each([null, undefined, 42, {}])('should return false for non-string value %j', (value) => {
    expect(isLocale(value)).toBe(false)
  })
})

describe('getLocale()', () => {
  it.each(['en', 'zh-TW'] as const)('should return "%s" when the locale is supported', (locale) => {
    expect(getLocale(locale)).toBe(locale)
  })

  it.each(['fr', ''])('should fall back to defaultLocale for unsupported locale string "%s"', (value) => {
    expect(getLocale(value)).toBe(defaultLocale)
  })

  it.each([null, undefined, 123])('should fall back to defaultLocale for non-string value %j', (value) => {
    expect(getLocale(value)).toBe(defaultLocale)
  })
})

describe('generateStaticLocalePaths()', () => {
  it('should return one path entry per locale', () => {
    const paths = generateStaticLocalePaths()
    expect(paths.length).toBe(locales.length)
  })

  it('should set lang to undefined for the default locale path', () => {
    const paths = generateStaticLocalePaths()
    const defaultEntry = paths.find((p) => p.params.lang === undefined)
    expect(defaultEntry).toBeDefined()
  })

  it('should include a path entry for each non-default locale', () => {
    const paths = generateStaticLocalePaths()
    const langs = paths.map((p) => p.params.lang)
    const nonDefault = locales.filter((l) => l !== defaultLocale)
    expect(langs).toEqual(expect.arrayContaining(nonDefault))
  })
})

describe('createI18nData()', () => {
  it('should support injecting module sources for easier testing', () => {
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

  it('should throw when the injected message source is empty', () => {
    expect(() =>
      createI18nData({
        messageModules: {},
        isDev: false,
      }),
    ).toThrow('[i18n] No locale files found under src/i18n/messages/*/*.json')
  })

  it('should throw when a path contains an unsupported locale', () => {
    expect(() =>
      createI18nData({
        messageModules: {
          './messages/fr/nav.json': { default: { blog: 'Blog' } },
        },
        isDev: false,
      }),
    ).toThrow('[i18n] Unsupported locale "fr"')
  })

  it('should merge multiple JSON modules for the same locale', () => {
    const data = createI18nData({
      messageModules: {
        './messages/en/nav.json': { default: { blog: 'Blog' } },
        './messages/en/home.json': { default: { title: 'Home' } },
      },
      isDev: false,
    })

    type EnMessages = { nav: { blog: string }; home: { title: string } }
    const en = data.messages.en as EnMessages
    expect(en.nav.blog).toBe('Blog')
    expect(en.home.title).toBe('Home')
  })

  it('should deeply merge overlapping module keys', () => {
    const data = createI18nData({
      messageModules: {
        './messages/en/tags.json': {
          default: {
            title: 'Tags',
            registry: { react: { name: 'React', description: 'A UI library' } },
          },
        },
      },
      isDev: false,
    })

    type TagMessages = { tags: { title: string; registry: Record<string, { name: string }> } }
    const en = data.messages.en as TagMessages
    expect(en.tags.title).toBe('Tags')
    expect(en.tags.registry.react.name).toBe('React')
  })

  it('should recursively merge a same-name module loaded from two different paths', () => {
    // Two paths that resolve to locale=en, moduleName=tags — triggers the recursive mergeRecords branch
    const data = createI18nData({
      messageModules: {
        './messages/en/tags.json': { default: { title: 'Tags' } },
        './alt/messages/en/tags.json': { default: { registry: { react: { name: 'React', description: '' } } } },
      },
      isDev: false,
    })

    type TagMessages = { tags: { title: string; registry: Record<string, { name: string }> } }
    const en = data.messages.en as TagMessages
    // Both sub-keys should survive — not overwritten by the second module
    expect(en.tags.title).toBe('Tags')
    expect(en.tags.registry.react.name).toBe('React')
  })

  it('should use preferredDefaultLocale to override the default locale', () => {
    const data = createI18nData({
      messageModules: {
        './messages/en/nav.json': { default: { blog: 'Blog' } },
        './messages/zh-TW/nav.json': { default: { blog: '文章' } },
      },
      preferredDefaultLocale: 'en',
      isDev: false,
    })

    expect(data.defaultLocale).toBe('en')
    expect(data.locales[0]).toBe('en')
  })

  it('should fall back to the first found locale when preferredDefaultLocale is absent from modules', () => {
    const data = createI18nData({
      messageModules: {
        './messages/en/nav.json': { default: { blog: 'Blog' } },
      },
      preferredDefaultLocale: 'zh-TW',
      isDev: false,
    })

    // zh-TW not present in modules, so en becomes default
    expect(data.defaultLocale).toBe('en')
  })

  it('should fall back a tag entry to the default locale when the locale-specific registry is missing the tag', () => {
    const data = createI18nData({
      messageModules: {
        './messages/zh-TW/tags.json': {
          default: { registry: { react: { name: 'React zh', description: 'React zh desc' } } },
        },
        './messages/en/tags.json': { default: { registry: {} } },
      },
      tagIds: ['react'],
      isDev: false,
    })

    type TagMessages = { tags: { registry: Record<string, { name: string }> } }
    // en registry is empty, should fall back to zh-TW (default locale) entry
    expect((data.messages.en as TagMessages).tags.registry.react.name).toBe('React zh')
  })

  it('should use tagId as name and description when tag is missing from all registries', () => {
    const data = createI18nData({
      messageModules: {
        './messages/en/tags.json': { default: { registry: {} } },
      },
      tagIds: ['typescript'],
      isDev: false,
    })

    type TagMessages = { tags: { registry: Record<string, { name: string; description: string }> } }
    const entry = (data.messages.en as TagMessages).tags.registry.typescript
    expect(entry.name).toBe('typescript')
    expect(entry.description).toBe('typescript')
  })

  it('should call warn with mismatch details in dev mode when tags differ between locales', () => {
    const warn = vi.fn()

    createI18nData({
      messageModules: {
        './messages/zh-TW/tags.json': {
          default: {
            registry: {
              react: { name: 'React', description: '' },
              typescript: { name: 'TypeScript', description: '' },
            },
          },
        },
        './messages/en/tags.json': {
          default: { registry: { react: { name: 'React', description: '' } } },
        },
      },
      tagIds: ['react', 'typescript'],
      isDev: true,
      warn,
    })

    // en is missing 'typescript', so warn should be called for en
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"en"'))
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('typescript'))
  })

  it('should not call warn when tag registries are in sync in dev mode', () => {
    const warn = vi.fn()

    createI18nData({
      messageModules: {
        './messages/zh-TW/tags.json': {
          default: { registry: { react: { name: 'React', description: '' } } },
        },
        './messages/en/tags.json': {
          default: { registry: { react: { name: 'React', description: '' } } },
        },
      },
      tagIds: ['react'],
      isDev: true,
      warn,
    })

    expect(warn).not.toHaveBeenCalled()
  })

  it('should not call warn in production mode even when tags differ', () => {
    const warn = vi.fn()

    createI18nData({
      messageModules: {
        './messages/zh-TW/tags.json': {
          default: { registry: { react: { name: 'React', description: '' } } },
        },
        './messages/en/tags.json': { default: { registry: {} } },
      },
      tagIds: ['react'],
      isDev: false,
      warn,
    })

    expect(warn).not.toHaveBeenCalled()
  })

  it('should silently ignore paths that do not match the locale/module path pattern', () => {
    // A path without /locale/module structure is filtered out (returns null in .map)
    const data = createI18nData({
      messageModules: {
        './messages/en/nav.json': { default: { blog: 'Blog' } },
        'invalid-path.json': { default: { blog: 'ignored' } },
      },
      isDev: false,
    })
    expect(data.locales).toContain('en')
    expect(data.locales).toHaveLength(1)
  })
})
