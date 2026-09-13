import type { RSSFeedItem } from '@astrojs/rss'
import rss from '@astrojs/rss'
import { defaultLocale, getLocale, locales, t } from '@/i18n'
import { getSortedCollectionList } from '@/utils/content'

const FEED_SIZE = 20

export function getStaticPaths() {
  return [
    { params: { lang: undefined } },
    ...locales.filter((l) => l !== defaultLocale).map((l) => ({ params: { lang: l } })),
  ]
}

interface Context {
  params: { lang: string | undefined }
  site: URL | undefined
}

export async function GET({ params, site }: Context) {
  const { lang } = params
  const locale = getLocale(lang)

  const allEntries = await getSortedCollectionList('blog', locale)
  const sorted = allEntries.filter((entry) => entry.data.draft !== true).slice(0, FEED_SIZE)

  const siteUrl = site ?? new URL('https://johnsonmao.github.io')
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  const items: RSSFeedItem[] = sorted.map((entry) => {
    return {
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `${prefix}/blog/${entry.id}/`,
    }
  })

  return rss({
    title: 'Johnson Mao',
    description: t(locale, 'feed.description'),
    site: siteUrl,
    items,
  })
}
