import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale, getLocalePriority, isLocale, normalizeLocale } from '@/i18n';

const selectedCollections = ['blog'] as const;

export type SelectedCollection = typeof selectedCollections[number];

export type LocalizedCollection<K extends SelectedCollection> = CollectionEntry<K> & {
	locale: Locale,
	isFallback?: boolean;
};

type LocalizedCollectionGroup<K extends SelectedCollection> = {
	id: string;
	entries: Map<Locale, LocalizedCollection<K>>;
}

/**
 * Get the base ID of a content entry (removes locale suffix)
 */
export function getBaseId(id: string): string {
	return id.includes('/') ? id.split('/')[0] : id;
}

/**
 * Get the locale of a content entry
 */
export function getLocale(id: string): Locale {
	return id.includes('/') ? id.split('/')[1] as Locale : defaultLocale;
}

/**
 * Get the best available entry version based on a priority list of locales
 */
export function getBestEntry<K extends SelectedCollection>(
	entries: Map<Locale, LocalizedCollection<K>>,
	priority: Locale[]
): LocalizedCollection<K> {
	for (const locale of priority) {
		const entry = entries.get(locale);
		if (entry) return entry;
	}
	const entry = Array.from(entries.values())[0];
	if (entry) return entry;
	throw new Error('No entry found');
}

/**
 * Get grouped entries by base ID, mapping each base ID to its available locale versions
 */
async function getGroupedCollection<K extends SelectedCollection>(
	collection: K,
): Promise<Map<string, LocalizedCollectionGroup<K>>> {
	const all = await getCollection(collection, ({ data }) => import.meta.env.DEV || data.draft !== true);
	const collectionMap = new Map<string, LocalizedCollectionGroup<K>>();

	all.forEach((entry) => {
		const [id, lowercaseLocale] = entry.id.split('/');
		const group = collectionMap.get(id);
		const locale = normalizeLocale(lowercaseLocale);

		if (!isLocale(locale)) {
			throw new Error(`Invalid locale: ${locale} in entry ${entry.id}`);
		}

		if (!group) {
			collectionMap.set(id, { id, entries: new Map([[locale, { ...entry, id, locale }]]) });
		} else {
			group.entries.set(locale, { ...entry, id, locale });
		}
	});

	return collectionMap;
}

export async function getCollectionEntry<K extends SelectedCollection>(
	collection: K,
	locale: Locale,
	id: string,
): Promise<LocalizedCollection<K>> {
	const collectionMap = await getGroupedCollection(collection);
	const priority = getLocalePriority(locale);
	const group = collectionMap.get(id);
	if (!group) {
		throw new Error(`Entry ${id} not found in collection ${collection}`);
	}
	const entry = getBestEntry<K>(group.entries, priority);
	return { ...entry, isFallback: entry.locale !== locale };
}

export async function getSortedCollectionList<K extends SelectedCollection>(
	collection: K,
	locale: Locale
): Promise<LocalizedCollection<K>[]> {
	const collectionMap = await getGroupedCollection(collection);
	const priority = getLocalePriority(locale);
	const entries = Array.from(collectionMap.values()).map((group) => getBestEntry<K>(group.entries, priority));
	const sorted = entries.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
	return sorted.map((entry) => ({ ...entry, isFallback: locale !== entry.locale }));	
}

/**
 * Get all tags and their associated entries across modern content collections
 */
export async function getEntriesByTag(locale: Locale) {
	const tagMap: Map<string, LocalizedCollection<SelectedCollection>[]> = new Map();

	for (const col of selectedCollections) {
		const collectionMap = await getGroupedCollection(col);
		Array.from(collectionMap.values()).forEach((group) => {
			Array.from(group.entries.values()).forEach((entry) => {
				if (entry.locale === locale && Array.isArray(entry.data.tags) && entry.data.tags.length > 0) {
					entry.data.tags.forEach((tag: string) => {
						if (!tagMap.has(tag)) tagMap.set(tag, []);
						tagMap.get(tag)!.push(entry);
					});
				}
			});
		});
	}

	return tagMap;
}

/**
 * Get related entries based on tag overlap.
 * 
 * Logic:
 * 1. Filter posts in the same locale (excluding the current post).
 * 2. Calculate common tags count.
 * 3. Sort by common tags count (desc) then by publication date (desc).
 * 4. Return top N.
 */
export async function getRelatedEntries<K extends SelectedCollection>(
	collection: K,
	entry: LocalizedCollection<K>,
	maxCount: number = 3
): Promise<LocalizedCollection<K>[]> {
	const allEntries = await getSortedCollectionList(collection, entry.locale);
	const currentTags = entry.data.tags ?? [];

	if (currentTags.length === 0) {
		// If no tags, just return latest posts from the same locale
		return allEntries
			.filter((entry) => entry.id !== entry.id && entry.locale === entry.locale)
			.sort((entryA, entryB) => entryB.data.pubDate.getTime() - entryA.data.pubDate.getTime())
			.slice(0, maxCount);
	}

	const related = allEntries
		.filter((entry) => entry.id !== entry.id && entry.locale === entry.locale)
		.map((entry) => {
			const commonTags = (entry.data.tags ?? []).filter((tag) => currentTags.includes(tag));
			return { data: entry, score: commonTags.length };
		})
		.filter((entry) => entry.score > 0)
		.sort((entryA, entryB) => {
			if (entryB.score !== entryA.score) return entryB.score - entryA.score;
			return entryB.data.data.pubDate.getTime() - entryA.data.data.pubDate.getTime();
		});

	if (related.length === 0) {
		// Fallback to latest posts if no overlap
		return allEntries
			.filter((entry) => entry.id !== entry.id && entry.locale === entry.locale)
			.sort((entryA, entryB) => entryB.data.pubDate.getTime() - entryA.data.pubDate.getTime())
			.slice(0, maxCount);
	}

	return related.slice(0, maxCount).map((entry) => entry.data);
}
