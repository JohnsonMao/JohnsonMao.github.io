/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

/**
 * Test file convention: place tests next to source as `*.test.ts` under `src/`.
 * Example: src/foo.ts → src/foo.test.ts
 * @see https://docs.astro.build/en/guides/testing/
 */
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    globals: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/glob.loader.ts',
        'src/env.d.ts',
        'src/content.config.ts',
        'src/glob.loader.ts',
        'src/content/**/*',
        'src/sw.ts',
        '**/*.json',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
