const cache = new Map<number, ArrayBuffer>()

/**
 * Fetches Noto Sans TC font from Google Fonts and caches it for the build process.
 * The module-level cache ensures the font is only downloaded once per weight
 * across all pages during a single build.
 */
export async function fetchNotoSansTC(weight: 400 | 700 = 400): Promise<ArrayBuffer> {
  const cached = cache.get(weight)
  if (cached !== undefined) return cached

  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@${weight}&display=swap`,
    // Mimic a browser User-Agent so Google Fonts returns WOFF2 format
    { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' } },
  ).then((r) => r.text())

  // Google Fonts returns woff2 for modern browsers and ttf for Googlebot UA.
  // Satori accepts both formats; grab whichever URL is present.
  const url = css.match(/url\(([^)]+)\)\s+format\('(?:woff2|truetype)'\)/)?.[1]
  if (!url) throw new Error(`Cannot find font URL from Google Fonts CSS (weight: ${weight})`)

  const buffer = await fetch(url).then((r) => r.arrayBuffer())
  cache.set(weight, buffer)
  return buffer
}
