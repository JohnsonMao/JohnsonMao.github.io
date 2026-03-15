import { describe, it, expect } from 'vitest';
import { parseEntryId, getBestEntry, validateTags } from './content';
import type { Locale } from '@/i18n';

describe('Content Utils', () => {
	describe('validateTags()', () => {
		it('should not throw for registered tags', () => {
			expect(() => validateTags('test-post', ['astro', 'demo'])).not.toThrow();
		});

		it('should throw error for unregistered tags', () => {
			expect(() => validateTags('test-post', ['non-existent' as any])).toThrow(/Unregistered tag ID/);
		});

		it('should handle undefined tags gracefully', () => {
			expect(() => validateTags('test-post', undefined)).not.toThrow();
		});
	});

	describe('parseEntryId()', () => {
		it('should parse standalone article ID correctly', () => {
			const { seriesId, slug } = parseEntryId('hello-world/zh-TW');
			expect(seriesId).toBeUndefined();
			expect(slug).toBe('hello-world');
		});

		it('should parse series article ID correctly and strip numerical prefix', () => {
			const { seriesId, slug } = parseEntryId('my-series/01-getting-started/en');
			expect(seriesId).toBe('my-series');
			expect(slug).toBe('getting-started');
		});

		it('should handle nested paths without numerical prefix', () => {
			const { seriesId, slug } = parseEntryId('my-series/intro/en');
			expect(seriesId).toBe('my-series');
			expect(slug).toBe('intro');
		});

		it('should handle raw slug as fallback', () => {
			const { seriesId, slug } = parseEntryId('standalone-slug');
			expect(seriesId).toBeUndefined();
			expect(slug).toBe('standalone-slug');
		});
	});

	describe('getBestEntry()', () => {
		const mockEntries = new Map<Locale, any>([
			['zh-TW', { id: 'post', locale: 'zh-TW', data: { title: '中文' } }],
			['en', { id: 'post', locale: 'en', data: { title: 'English' } }]
		]);

		it('should pick the exact locale if available', () => {
			const entry = getBestEntry(mockEntries, ['en', 'zh-TW']);
			expect(entry.locale).toBe('en');
		});

		it('should fallback to next available locale in priority list', () => {
			const partialEntries = new Map<Locale, any>([
				['zh-TW', { id: 'post', locale: 'zh-TW', data: { title: '中文' } }]
			]);
			const entry = getBestEntry(partialEntries, ['en', 'zh-TW']);
			expect(entry.locale).toBe('zh-TW');
		});

		it('should fallback to first available if priority list fails', () => {
			const entry = getBestEntry(mockEntries, ['ja' as any]);
			expect(entry).toBeDefined();
			expect(['zh-TW', 'en']).toContain(entry.locale);
		});
	});
});
