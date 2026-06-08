import type { RSSFeedItem } from '@astrojs/rss'
import rss from '@astrojs/rss'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET, getStaticPaths } from './feed.xml'

// Mock Astro-specific modules first, before imports
vi.mock('@astrojs/rss', () => {
  const mockRss = vi.fn(args => args)
  return {
    default: mockRss,
  }
})

vi.mock('@/utils/content', () => ({
  getSortedCollectionList: vi.fn(async () => [
    {
      id: 'post-1/zh-TW',
      data: { title: 'Post 1', description: 'Desc 1', pubDate: new Date('2024-01-01'), draft: false },
    },
    {
      id: 'post-2/en',
      data: { title: 'Post 2', description: 'Desc 2', pubDate: new Date('2024-01-02'), draft: true },
    },
  ]),
  parseEntryId: (id: string) => ({ slug: id.split('/')[0] }),
}))

const mockRss = vi.mocked(rss)

describe('rss feed', () => {
  describe('getStaticPaths()', () => {
    it('returns paths for all supported locales including default (undefined)', () => {
      const paths = getStaticPaths()
      expect(paths).toContainEqual({ params: { lang: undefined } })
      expect(paths).toContainEqual({ params: { lang: 'en' } })
    })
  })

  describe('get()', () => {
    const mockContext = {
      params: { lang: undefined },
      site: new URL('https://test.com'),
    }

    beforeEach(() => {
      mockRss.mockClear()
    })

    it('filters out draft posts', async () => {
      await GET(mockContext)
      expect(mockRss).toHaveBeenCalled()
      const items = mockRss.mock.calls[0][0].items as RSSFeedItem[]
      expect(items).toHaveLength(1)
      expect(items[0].title).toBe('Post 1')
    })

    it('generates correct links for default locale', async () => {
      await GET(mockContext)
      expect(mockRss).toHaveBeenCalled()
      const items = mockRss.mock.calls[0][0].items as RSSFeedItem[]
      expect(items[0].link).toBe('/blog/post-1/')
    })

    it('generates correct links for non-default locale', async () => {
      const enContext = {
        params: { lang: 'en' },
        site: new URL('https://test.com'),
      }
      await GET(enContext)
      expect(mockRss).toHaveBeenCalled()
      const items = mockRss.mock.calls[0][0].items as RSSFeedItem[]
      expect(items[0].link).toBe('/en/blog/post-1/')
    })

    it('uses fallback site URL if site is undefined', async () => {
      const noSiteContext = {
        params: { lang: undefined },
        site: undefined,
      }
      await GET(noSiteContext)
      expect(mockRss).toHaveBeenCalled()
      const site = mockRss.mock.calls[0][0].site
      expect(site.toString()).toBe('https://johnsonmao.github.io/')
    })
  })
})
