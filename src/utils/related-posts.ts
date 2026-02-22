import type { CollectionEntry } from 'astro:content';

/**
 * Get related posts based on tag overlap.
 * 
 * Logic:
 * 1. Filter posts in the same locale (excluding the current post).
 * 2. Calculate common tags count.
 * 3. Sort by common tags count (desc) then by publication date (desc).
 * 4. Return top N.
 */
export function getRelatedPosts(
	currentPost: CollectionEntry<'blog'>,
	allPosts: CollectionEntry<'blog'>[],
	maxCount: number = 3
): CollectionEntry<'blog'>[] {
	const currentTags = currentPost.data.tags ?? [];
	if (currentTags.length === 0) {
		// If no tags, just return latest posts from the same locale
		return allPosts
			.filter((p) => p.id !== currentPost.id && p.data.lang === currentPost.data.lang)
			.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
			.slice(0, maxCount);
	}

	const related = allPosts
		.filter((p) => p.id !== currentPost.id && p.data.lang === currentPost.data.lang)
		.map((p) => {
			const commonTags = (p.data.tags ?? []).filter((tag) => currentTags.includes(tag));
			return { post: p, score: commonTags.length };
		})
		.filter((p) => p.score > 0)
		.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime();
		});

	if (related.length === 0) {
		// Fallback to latest posts if no overlap
		return allPosts
			.filter((p) => p.id !== currentPost.id && p.data.lang === currentPost.data.lang)
			.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
			.slice(0, maxCount);
	}

	return related.slice(0, maxCount).map((r) => r.post);
}
