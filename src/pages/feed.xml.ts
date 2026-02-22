import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { t, defaultLocale } from '@/i18n';

const FEED_SIZE = 20;

interface Context {
	site: URL | undefined;
}

export async function GET(context: Context) {
	const all = await getCollection('blog', ({ data }) => data.draft !== true && data.lang === defaultLocale);
	const sorted = all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()).slice(0, FEED_SIZE);

	const slug = (entry: (typeof sorted)[number]) =>
		entry.id.includes('/') ? entry.id.split('/').slice(1).join('/') : entry.id;

	return rss({
		title: 'Johnson Mao',
		description: t(defaultLocale, 'feed.description'),
		site: context.site ?? new URL('https://johnsonmao.github.io'),
		items: sorted.map((entry) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: entry.data.pubDate,
			link: `/blog/${slug(entry)}/`,
		})),
	});
}
