import { Feed, FeedOptions } from 'feed';
import fs from 'fs';
import { Locale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import path from 'path';
import { WEBSITE_CONFIGS } from '#/constants';
import { routing } from '@/i18n/routing';

export const PUBLIC_FEED_PATH = path.join(process.cwd(), 'public', 'feed');

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
    image: `${WEBSITE_CONFIGS.domainUrl}${WEBSITE_CONFIGS.avatarUrl}`,
    favicon: `${WEBSITE_CONFIGS.domainUrl}/favicon.ico`,
    feedLinks: {
      atom: `${WEBSITE_CONFIGS.domainUrl}/feed/atom.xml`,
    },
  };
}

function generateRSS(feedOptions: FeedOptions) {
  const locale = feedOptions.language || routing.defaultLocale;
  const feed = new Feed(feedOptions);

  if (!fs.existsSync(PUBLIC_FEED_PATH)) fs.mkdirSync(PUBLIC_FEED_PATH);

  fs.writeFileSync(
    path.join(PUBLIC_FEED_PATH, `atom.${locale}.xml`),
    feed.atom1()
  );
}

export default generateRSS;
