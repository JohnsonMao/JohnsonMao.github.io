import type { APIRoute } from 'astro'
import { isLocale, locales } from '@/i18n'
import {
  createPaginatedPage,
  getPaginatedArticles,
  getSortedCollectionList,
  serializeArticle,
} from '@/utils/content'
import { getReadingTime } from '@/utils/reading-time'

const ARTICLES_PER_PAGE = 10

export const prerender = true

export async function getStaticPaths() {
  const paths = []

  for (const locale of locales) {
    if (!isLocale(locale))
      continue

    const articles = await getSortedCollectionList('blog', locale)
    const pages = getPaginatedArticles(articles, ARTICLES_PER_PAGE)

    for (let pageNum = 1; pageNum <= pages.length; pageNum++) {
      paths.push({
        params: {
          lang: locale,
          page: pageNum.toString(),
        },
      })
    }
  }

  return paths
}

export const GET: APIRoute = async ({ params }) => {
  const { lang, page: pageStr } = params
  const locale = lang as any
  const pageNum = Number.parseInt(pageStr!, 10)

  if (!isLocale(locale) || !pageNum || pageNum < 1) {
    return new Response(JSON.stringify({ error: 'Invalid page or locale' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const articles = await getSortedCollectionList('blog', locale)
  const pages = getPaginatedArticles(articles, ARTICLES_PER_PAGE)

  if (pageNum > pages.length) {
    return new Response(JSON.stringify({ error: 'Page not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const pageArticles = pages[pageNum - 1]!
  const serialized = pageArticles.map((article) => {
    const readingTime = getReadingTime(article.body ?? '', article.locale)
    return serializeArticle(article, readingTime.label)
  })

  const paginatedPage = createPaginatedPage(
    pageNum,
    locale,
    serialized,
    pageNum < pages.length,
  )

  return new Response(JSON.stringify(paginatedPage), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
