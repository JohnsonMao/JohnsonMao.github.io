import type { Metadata } from 'next';
import type { FeedOptions } from 'feed';
import { locales } from '~/i18n';

export const title = "Mao's Notes";
export const githubUrl = 'https://github.com/JohnsonMao';
export const domainUrl = 'https://mao-note.vercel.app';
export const name = 'Johnson Mao';
export const email = 'tutelary.maomao@gmail.com';
export const copyright = `Copyright © ${new Date().getFullYear()} Mao's Notes | ${name}. All rights reserved.`;

type NonNullableMetadata = {
  [K in keyof Metadata]: NonNullable<Metadata[K]>;
};

export const baseMetadata: NonNullableMetadata = {
  title,
  description: 'Notes on Learning Front-end Development',
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

export const feedOptions: FeedOptions = {
  id: domainUrl,
  title,
  copyright,
  description: baseMetadata.description,
  link: domainUrl,
  author: {
    name,
    email,
    link: domainUrl,
  },
  // image
  // favicon
  feedLinks: {
    atom: `${domainUrl}/feed/atom.xml`,
    rss2: `${domainUrl}/feed/feed.xml`,
    json: `${domainUrl}/feed/feed.json`,
  },
};
