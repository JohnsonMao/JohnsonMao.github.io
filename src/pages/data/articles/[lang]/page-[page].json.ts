import type { APIRoute } from 'astro'
import { isLocale, locales, t } from '@/i18n'
import type { PaginatedArticlesPage, SerializedArticle } from '@/utils/content'
import { getPaginatedArticles, getSortedCollectionList } from '@/utils/content'
import { getReadingTimeMinutes } from '@/utils/reading-time'

const ARTICLES_PER_PAGE = 10

export const prerender = true

export async function getStaticPaths() {
  const paths = []

  for (const locale of locales) {
    if (!isLocale(locale)) continue

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
  const pageNum = Number.parseInt(pageStr ?? '', 10)

  if (!isLocale(lang) || !pageNum || pageNum < 1) {
    return new Response(JSON.stringify({ error: 'Invalid page or locale' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const articles = await getSortedCollectionList('blog', lang)
  const pages = getPaginatedArticles(articles, ARTICLES_PER_PAGE)

  if (pageNum > pages.length) {
    return new Response(JSON.stringify({ error: 'Page not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const pageArticles = pages[pageNum - 1] ?? []
  const serializedArticles: SerializedArticle[] = pageArticles.map((article) => {
    const readingTimeMinutes = getReadingTimeMinutes(article.body ?? '', article.locale)
    return {
      id: article.id,
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate.toISOString(),
      tags: article.tags,
      readingTime: t(lang, 'blog.readingTime', { minutes: readingTimeMinutes }),
    }
  })

  const paginatedPage: PaginatedArticlesPage = {
    page: pageNum,
    locale: lang,
    articles: serializedArticles,
    hasMore: pageNum < pages.length,
  }

  return new Response(JSON.stringify(paginatedPage), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
