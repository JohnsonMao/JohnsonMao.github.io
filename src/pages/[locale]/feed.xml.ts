import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { t } from '@/i18n';

const FEED_SIZE = 20;

export function getStaticPaths() {
	return [{ params: { locale: 'en' } }];
}

interface Context {
	params: { locale: 'en' };
	site: URL | undefined;
}

export async function GET({ params, site }: Context) {
	const { locale } = params;
	const all = await getCollection('blog', ({ data }) => data.draft !== true && data.lang === locale);
	const sorted = all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()).slice(0, FEED_SIZE);

	const slug = (entry: (typeof sorted)[number]) =>
		entry.id.includes('/') ? entry.id.split('/').slice(1).join('/') : entry.id;

	return rss({
		title: 'Johnson Mao',
		description: t(locale, 'feed.description'),
		site: site ?? new URL('https://johnsonmao.github.io'),
		items: sorted.map((entry) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: entry.data.pubDate,
			link: `/${locale}/blog/${slug(entry)}/`,
		})),
	});
}
