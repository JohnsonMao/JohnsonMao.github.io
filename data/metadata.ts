import type { Metadata } from 'next';
import type { FeedOptions } from 'feed';
import { Locale, defaultLocale, getDictionary, locales } from '~/i18n';

export const name = 'Johnson Mao';
export const email = 'tutelary.maomao@gmail.com';
export const domainUrl = 'https://mao-note.vercel.app';
export const githubUrl = 'https://github.com/JohnsonMao';
export const copyright = `Copyright © ${new Date().getFullYear()} Mao's Notes | ${name}. All rights reserved.`;

export async function createMetadata(
  locale: Locale = defaultLocale
): Promise<Metadata> {
  const {
    metadata: { title, description },
  } = await getDictionary(locale);

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    metadataBase: new URL(domainUrl),
    applicationName: title,
    keywords: ['frontend', 'notes'],
    referrer: 'origin',
    themeColor: '#000000',
    robots: 'index, follow',
    authors: [
      {
        name,
        url: githubUrl,
      },
    ],
    alternates: {
      canonical: '/',
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `/${locale}`])
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
    metadata: { title, description },
  } = await getDictionary(locale);

  return {
    id: domainUrl,
    title,
    copyright,
    description,
    link: domainUrl,
    language: locale,
    author: {
      name,
      email,
      link: domainUrl,
    },
    // image
    // favicon
    feedLinks: {
      atom: `${domainUrl}/feed/atom.xml`,
    },
  };
}
