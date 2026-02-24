import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { locales, defaultLocale, type Locale } from '@/i18n';

/**
 * Get the base ID of a content entry (removes locale prefix)
 */
export function getBaseId(id: string): string {
	return id.includes('/') ? id.split('/').slice(1).join('/') : id;
}

/**
 * Get the locale of a content entry
 */
export function getEntryLocale(id: string): Locale {
	const firstPart = id.split('/')[0] as Locale;
	return locales.includes(firstPart) ? firstPart : defaultLocale;
}

/**
 * Get grouped entries by base ID, mapping each base ID to its available locale versions
 */
export async function getGroupedEntries<K extends CollectionKey>(collection: K) {
	const all = await getCollection(collection, ({ data }: any) => import.meta.env.DEV || data.draft !== true);
	const grouped: Record<string, Record<string, CollectionEntry<K>>> = {};

	all.forEach((entry) => {
		const baseId = getBaseId(entry.id);
		const locale = (entry.data as any).lang as Locale;
		if (!grouped[baseId]) grouped[baseId] = {};
		grouped[baseId][locale] = entry;
	});

	return grouped;
}

/**
 * Get the best available entry version based on a priority list of locales
 */
export function getBestEntry<K extends CollectionKey>(
	versions: Record<string, CollectionEntry<K>>,
	priority: Locale[]
): CollectionEntry<K> | undefined {
	for (const locale of priority) {
		if (versions[locale]) return versions[locale];
	}
	// Fallback to the first available version if no priority match
	const availableLocales = Object.keys(versions);
	if (availableLocales.length > 0) {
		return versions[availableLocales[0]];
	}
	return undefined;
}

/**
 * Get all tags and their associated entries across modern content collections
 */
export async function getEntriesByTag(targetLocale: Locale) {
	const collections: CollectionKey[] = ['blog']; // Expandable for future collections like 'projects'
	const tagMap: Record<string, any[]> = {};

	for (const col of collections) {
		const grouped = await getGroupedEntries(col);
		for (const [baseId, versions] of Object.entries(grouped)) {
			// For tag pages, prioritize current locale, then default, then others
			const entry = getBestEntry(versions, [targetLocale, defaultLocale, ...locales]);
			if (entry && (entry.data as any).tags) {
				(entry.data as any).tags.forEach((tag: string) => {
					if (!tagMap[tag]) tagMap[tag] = [];
					tagMap[tag].push({
						...entry,
						baseId,
						versions: Object.keys(versions),
					});
				});
			}
		}
	}

	return tagMap;
}
