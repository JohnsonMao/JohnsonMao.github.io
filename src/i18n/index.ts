import en from './en.json';
import zhTW from './zh-TW.json';

export type Locale = 'en' | 'zh-TW';

const messages: Record<Locale, Record<string, unknown>> = {
	'en': en as Record<string, unknown>,
	'zh-TW': zhTW as Record<string, unknown>,
};

function getNested(obj: Record<string, unknown>, key: string): string | undefined {
	const parts = key.split('.');
	let current: unknown = obj;
	for (const part of parts) {
		if (current == null || typeof current !== 'object') return undefined;
		current = (current as Record<string, unknown>)[part];
	}
	return typeof current === 'string' ? current : undefined;
}

export function t(locale: Locale, key: string, vars?: Record<string, string>): string {
	const data = messages[locale];
	const value = getNested(data as Record<string, unknown>, key);
	if (value == null) return key;
	if (!vars) return value;
	return Object.entries(vars).reduce((s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), v), value);
}
