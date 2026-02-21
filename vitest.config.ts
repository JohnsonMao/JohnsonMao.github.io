/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

/**
 * Test file convention: place tests next to source as `*.test.ts` under `src/`.
 * Example: src/foo.ts → src/foo.test.ts
 * @see https://docs.astro.build/en/guides/testing/
 */
export default getViteConfig({
	test: {
		include: ['src/**/*.test.ts'],
		globals: false,
	},
});
