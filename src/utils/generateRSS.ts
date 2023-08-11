import path from 'path';
import fs from 'fs';
import { Feed, FeedOptions } from 'feed';

export const PUBLIC_FEED_PATH = path.join(process.cwd(), 'public', 'feed');

function generateRSS(feedOptions: FeedOptions) {
  const feed = new Feed(feedOptions);

  if (!fs.existsSync(PUBLIC_FEED_PATH)) fs.mkdirSync(PUBLIC_FEED_PATH);
  fs.writeFileSync(path.join(PUBLIC_FEED_PATH, 'feed.xml'), feed.rss2());
  fs.writeFileSync(path.join(PUBLIC_FEED_PATH, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(PUBLIC_FEED_PATH, 'feed.json'), feed.json1());
}

export default generateRSS;
