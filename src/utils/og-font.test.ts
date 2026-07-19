import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const mockCssWithWoff2 = `
@font-face {
  font-family: 'Noto Sans TC';
  src: url(https://fonts.gstatic.com/s/notosanstc/v1/nKKF-weight400.woff2) format('woff2');
}
`

const mockCssWithTruetype = `
@font-face {
  font-family: 'Noto Sans TC';
  src: url(https://fonts.gstatic.com/s/notosanstc/v1/nKKF-weight400.ttf) format('truetype');
}
`

const mockFontBuffer = new ArrayBuffer(8)

function setupMockFetch(css: string) {
  mockFetch
    .mockResolvedValueOnce({ text: async () => css })
    .mockResolvedValueOnce({ arrayBuffer: async () => mockFontBuffer })
}

// Re-import with a fresh module (cleared cache) before each test
async function freshImport() {
  vi.resetModules()
  return import('./og-font')
}

describe('fetchNotoSansTC()', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('fetches CSS from Google Fonts with correct weight param', async () => {
    setupMockFetch(mockCssWithWoff2)
    const { fetchNotoSansTC } = await freshImport()
    await fetchNotoSansTC(400)

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('wght@400'),
      expect.objectContaining({ headers: expect.any(Object) }),
    )
  })

  it('sends Googlebot User-Agent header', async () => {
    setupMockFetch(mockCssWithWoff2)
    const { fetchNotoSansTC } = await freshImport()
    await fetchNotoSansTC(700)

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ 'User-Agent': expect.stringContaining('Googlebot') }),
      }),
    )
  })

  it('extracts woff2 font URL and fetches the buffer', async () => {
    setupMockFetch(mockCssWithWoff2)
    const { fetchNotoSansTC } = await freshImport()
    const result = await fetchNotoSansTC(400)

    expect(mockFetch).toHaveBeenCalledWith('https://fonts.gstatic.com/s/notosanstc/v1/nKKF-weight400.woff2')
    expect(result).toBe(mockFontBuffer)
  })

  it('extracts truetype font URL as fallback', async () => {
    setupMockFetch(mockCssWithTruetype)
    const { fetchNotoSansTC } = await freshImport()
    const result = await fetchNotoSansTC(400)

    expect(mockFetch).toHaveBeenCalledWith('https://fonts.gstatic.com/s/notosanstc/v1/nKKF-weight400.ttf')
    expect(result).toBe(mockFontBuffer)
  })

  it('caches the font buffer on repeated calls', async () => {
    setupMockFetch(mockCssWithWoff2)
    const { fetchNotoSansTC } = await freshImport()
    const first = await fetchNotoSansTC(400)
    const second = await fetchNotoSansTC(400)

    // fetch should only be called twice (CSS + font), not four times
    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(second).toBe(first)
  })

  it('throws when font URL cannot be found in CSS', async () => {
    mockFetch.mockResolvedValueOnce({ text: async () => 'body { color: red; }' })
    const { fetchNotoSansTC } = await freshImport()

    await expect(fetchNotoSansTC(400)).rejects.toThrow('Cannot find font URL')
  })
})
