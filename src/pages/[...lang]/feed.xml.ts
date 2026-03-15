import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { defaultLocale, getLocale, locales, t } from '@/i18n'

const FEED_SIZE = 20

export function getStaticPaths() {
  return [
    { params: { lang: undefined } },
    ...locales.filter(l => l !== defaultLocale).map(l => ({ params: { lang: l } })),
  ]
}

interface Context {
  params: { lang: string | undefined }
  site: URL | undefined
}

export async function GET({ params, site }: Context) {
  const { lang } = params
  const locale = getLocale(lang)
  const all = await getCollection('blog', ({ data }) => data.draft !== true && data.lang === locale)
  const sorted = all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()).slice(0, FEED_SIZE)

  const slug = (entry: (typeof sorted)[number]) =>
    entry.id.includes('/') ? entry.id.split('/').slice(1).join('/') : entry.id

  const siteUrl = site ?? new URL('https://johnsonmao.github.io')
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  return rss({
    title: 'Johnson Mao',
    description: t(locale, 'feed.description'),
    site: siteUrl,
    items: sorted.map(entry => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `${prefix}/blog/${slug(entry)}/`,
    })),
  })
}
