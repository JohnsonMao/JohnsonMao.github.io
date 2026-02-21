import { describe, it, expect, vi } from 'vitest';

const { mockEn, mockZhTW } = vi.hoisted(() => ({
	mockEn: {
		nav: { home: 'Home', blog: 'Blog' },
		msg: 'Hello {name}, year {year}',
	},
	mockZhTW: {
		nav: { home: '首頁', blog: '文章' },
		msg: '你好 {name}，{year} 年',
	},
}));

vi.mock('./en.json', () => ({ default: mockEn }));
vi.mock('./zh-TW.json', () => ({ default: mockZhTW }));

import { t } from './index.js';

describe('i18n t()', () => {
	it('returns nested key for en', () => {
		expect(t('en', 'nav.home')).toBe('Home');
		expect(t('en', 'nav.blog')).toBe('Blog');
	});

	it('returns nested key for zh-TW', () => {
		expect(t('zh-TW', 'nav.home')).toBe('首頁');
		expect(t('zh-TW', 'nav.blog')).toBe('文章');
	});

	it('replaces one or more variables in message', () => {
		expect(t('en', 'msg', { name: 'A', year: '2025' })).toBe(
			'Hello A, year 2025',
		);
		expect(t('zh-TW', 'msg', { name: 'B', year: '2026' })).toBe(
			'你好 B，2026 年',
		);
	});

	it('returns key when translation is missing', () => {
		expect(t('en', 'missing.key')).toBe('missing.key');
	});

	it('returns value without substitution when vars is not provided', () => {
		expect(t('en', 'msg')).toBe('Hello {name}, year {year}');
	});
});
