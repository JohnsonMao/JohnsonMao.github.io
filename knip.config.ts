import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  astro: {
    config: ['astro.config.{js,cjs,mjs,ts,mts}'],
    entry: [
      'src/content/config.ts',
      'src/content.config.ts',
      'src/pages/**/*.{astro,mdx,js,ts}',
      '!src/pages/**/_*',
      '!src/pages/**/_*/**',
      'src/content/**/*.mdx',
      'src/middleware.{js,ts}',
      'src/middleware/index.{js,ts}',
      'src/actions/index.{js,ts}',
      'src/sw.ts',
    ],
  },
  ignore: [
    'scripts/check-registries.mjs',
  ],
  ignoreDependencies: [
    '@iconify-json/lucide',
    '@iconify-json/simple-icons',
    'workbox-window',
  ],
}

export default config
