import { Feed, FeedOptions } from 'feed';
import fs from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';

export const PUBLIC_FEED_PATH = path.join(process.cwd(), 'public', 'feed');

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
