import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { initWasm, Resvg } from '@resvg/resvg-wasm'
import type { APIRoute } from 'astro'
import satori from 'satori'
import { locales } from '@/i18n'
import { getSortedCollectionList } from '@/utils/content'
import { fetchNotoSansTC } from '@/utils/og-font'
import { buildOgCard, type OgCardProps } from '@/utils/og-template'

// ---------------------------------------------------------------------------
// WASM initialisation — runs once per build process
// ---------------------------------------------------------------------------
let wasmReady = false

async function ensureWasm() {
  if (wasmReady) return
  const require = createRequire(import.meta.url)
  const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm')
  const wasmData = await readFile(wasmPath)
  await initWasm(wasmData)
  wasmReady = true
}

export async function getStaticPaths() {
  const allPaths = await Promise.all(
    locales.map(async (locale) => {
      const entries = await getSortedCollectionList('blog', locale)
      return entries.map((entry) => ({
        params: { lang: locale, slug: entry.id },
        props: {
          title: entry.data.title,
          description: entry.data.description,
          pubDate: entry.data.pubDate,
          tags: entry.tags ?? [],
          locale: entry.locale,
        },
      }))
    }),
  )
  return allPaths.flat()
}

export const GET: APIRoute<OgCardProps> = async ({ props }) => {
  await ensureWasm()

  const [fontRegular, fontBold] = await Promise.all([fetchNotoSansTC(400), fetchNotoSansTC(700)])

  const svg = await satori(buildOgCard(props), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Noto Sans TC', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Noto Sans TC', data: fontBold, weight: 700, style: 'normal' },
    ],
  })

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  const png = resvg.render().asPng()

  return new Response(png.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
