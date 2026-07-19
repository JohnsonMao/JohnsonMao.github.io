import satori from 'satori'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET, getStaticPaths } from '../[...slug].png'

vi.mock('@/i18n', () => ({
  locales: ['zh-TW', 'en'],
}))

vi.mock('@/utils/content', () => ({
  getSortedCollectionList: vi.fn(async (_collection: string, locale: string) => [
    {
      id: `${locale}/post-1`,
      locale,
      tags: ['javascript', 'typescript'],
      data: {
        title: `Post 1 (${locale})`,
        description: `Description for post 1 in ${locale}`,
        pubDate: new Date('2024-03-01'),
      },
    },
    {
      id: `${locale}/post-2`,
      locale,
      tags: undefined,
      data: {
        title: `Post 2 (${locale})`,
        description: undefined,
        pubDate: new Date('2024-04-01'),
      },
    },
  ]),
}))

vi.mock('@/utils/og-font', () => ({
  fetchNotoSansTC: vi.fn(async () => new ArrayBuffer(8)),
}))

vi.mock('satori', () => ({
  default: vi.fn(async () => '<svg></svg>'),
}))

vi.mock('@resvg/resvg-wasm', () => ({
  initWasm: vi.fn(async () => {}),
  Resvg: class {
    render() {
      return { asPng: () => ({ buffer: new ArrayBuffer(4) }) }
    }
  },
}))

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(async () => Buffer.from([])),
}))

vi.mock('node:module', () => ({
  createRequire: () => {
    const req = () => '/fake/path/to/resvg.wasm'
    req.resolve = () => '/fake/path/to/resvg.wasm'
    return req
  },
}))

describe('getStaticPaths()', () => {
  it('returns paths for all locales × posts', async () => {
    const paths = await getStaticPaths()
    // 2 locales × 2 posts = 4 paths
    expect(paths).toHaveLength(4)
  })

  it('sets lang and slug params correctly', async () => {
    const paths = await getStaticPaths()
    expect(paths).toContainEqual(expect.objectContaining({ params: { lang: 'zh-TW', slug: 'zh-TW/post-1' } }))
    expect(paths).toContainEqual(expect.objectContaining({ params: { lang: 'en', slug: 'en/post-1' } }))
  })

  it('maps post data to props', async () => {
    const paths = await getStaticPaths()
    const firstPath = paths.find((p) => p.params.slug === 'zh-TW/post-1')
    expect(firstPath?.props).toMatchObject({
      title: 'Post 1 (zh-TW)',
      description: 'Description for post 1 in zh-TW',
      tags: ['javascript', 'typescript'],
      locale: 'zh-TW',
    })
    expect(firstPath?.props.pubDate).toBeInstanceOf(Date)
  })

  it('falls back to empty array when tags is undefined', async () => {
    const paths = await getStaticPaths()
    const pathWithNoTags = paths.find((p) => p.params.slug === 'zh-TW/post-2')
    expect(pathWithNoTags?.props.tags).toEqual([])
  })
})

const mockProps = {
  title: 'Test Post',
  description: 'A test description',
  tags: ['js', 'ts'],
  pubDate: new Date('2024-06-01'),
  locale: 'zh-TW',
}

const mockContext = {
  request: new Request('https://example.com/og/zh-TW/blog/test-post.png'),
  params: { lang: 'zh-TW', slug: 'zh-TW/test-post' },
  props: mockProps,
  url: new URL('https://example.com/og/zh-TW/blog/test-post.png'),
} as unknown as Parameters<typeof GET>[0]

describe('GET()', () => {
  beforeEach(() => {
    vi.mocked(satori).mockClear()
  })

  it('returns a Response with Content-Type image/png', async () => {
    const res = await GET(mockContext)
    expect(res.headers.get('Content-Type')).toBe('image/png')
  })

  it('returns a Response with immutable Cache-Control header', async () => {
    const res = await GET(mockContext)
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
  })

  it('returns a non-empty ArrayBuffer as the response body', async () => {
    const res = await GET(mockContext)
    const buf = await res.arrayBuffer()
    expect(buf).toBeInstanceOf(ArrayBuffer)
  })

  it('calls satori with 1200×630 dimensions', async () => {
    await GET(mockContext)
    expect(satori).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ width: 1200, height: 630 }))
  })

  it('passes both regular and bold Noto Sans TC fonts to satori', async () => {
    await GET(mockContext)
    expect(satori).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        fonts: expect.arrayContaining([
          expect.objectContaining({ weight: 400, style: 'normal' }),
          expect.objectContaining({ weight: 700, style: 'normal' }),
        ]),
      }),
    )
  })
})
