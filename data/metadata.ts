import type { FeedOptions } from 'feed';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { WEBSITE_CONFIGS } from '#/constants';
import { routing } from '@/i18n/routing';

export async function createMetadata(locale: Locale): Promise<Metadata> {
  const {
    common: { title },
    homePage: { description },
  } = await getMessages({ locale });

  return {
    title: {
      template: `%s - ${title}`,
      default: title,
    },
    description,
    metadataBase: new URL(WEBSITE_CONFIGS.domainUrl),
    applicationName: title,
    keywords: ['frontend', 'notes'],
    referrer: 'origin',
    robots: 'index, follow',
    authors: [
      {
        name: WEBSITE_CONFIGS.authorName,
        url: WEBSITE_CONFIGS.authorUrl,
      },
    ],
    alternates: {
      canonical: '/',
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `/${locale}`])
      ),
    },
    // icons: [],
    // manifest: '',
    // openGraph: {},
    // appleWebApp: {},
    // category: '',
  };
}

export async function createFeedOptions(locale: Locale): Promise<FeedOptions> {
  const {
    homePage: { title, description },
  } = await getMessages({ locale });

  return {
    id: WEBSITE_CONFIGS.domainUrl,
    title,
    copyright: WEBSITE_CONFIGS.copyright,
    description,
    link: WEBSITE_CONFIGS.domainUrl,
    language: locale,
    author: {
      name: WEBSITE_CONFIGS.authorName,
      email: WEBSITE_CONFIGS.authorEmail,
      link: WEBSITE_CONFIGS.authorUrl,
    },
    // image
    // favicon
    feedLinks: {
      atom: `${WEBSITE_CONFIGS.domainUrl}/feed/atom.xml`,
    },
  };
}
