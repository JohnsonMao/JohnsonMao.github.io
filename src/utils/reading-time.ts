/**
 * Estimate reading time from content (markdown or plain text).
 * Strips markdown syntax and counts characters; divides by locale-specific WPM.
 */

const CHARS_PER_MINUTE_ZH = 220;
const CHARS_PER_MINUTE_EN = 280;

/**
 * Strip markdown-style formatting to approximate plain text length.
 */
function stripMarkdown(content: string): string {
	return content
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]+`/g, ' ')
		.replace(/#{1,6}\s/g, ' ')
		.replace(/\*\*?[^*]+\*\*?/g, ' ')
		.replace(/__?[^_]+__?/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/^[-*+]\s/gm, ' ')
		.replace(/^\d+\.\s/gm, ' ')
		.replace(/\n+/g, ' ')
		.trim();
}

export interface ReadingTimeResult {
	minutes: number;
	label: string;
}

/**
 * Get estimated reading time in minutes. Rounds up; returns at least 1 for non-empty content.
 * @param content - Raw markdown or plain text
 * @param locale - Optional locale for WPM (future use); currently uses unified default
 */
export function getReadingTimeMinutes(
	content: string,
	locale?: 'en' | 'zh-TW'
): number {
	const text = stripMarkdown(content);
	const len = text.length;
	if (len === 0) return 0;
	const wpm = locale === 'en' ? CHARS_PER_MINUTE_EN : CHARS_PER_MINUTE_ZH;
	return Math.max(1, Math.ceil(len / wpm));
}

/**
 * Get reading time with a display label (e.g. "約 5 分鐘" / "5 min read").
 */
export function getReadingTime(content: string, locale?: 'en' | 'zh-TW'): ReadingTimeResult {
	const minutes = getReadingTimeMinutes(content, locale ?? 'zh-TW');
	const label = (locale ?? 'zh-TW') === 'en' ? `${minutes} min read` : `約 ${minutes} 分鐘`;
	return { minutes, label };
}
