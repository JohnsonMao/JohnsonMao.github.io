import type { KnipConfig } from 'knip'

const isProduction = process.argv.includes('--production')

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
    '.agents/**',
    // This development script is outside the production entry graph.
    ...(isProduction ? ['scripts/check-registries.mjs'] : []),
  ],
  ignoreDependencies: [
    '@iconify-json/lucide',
    '@iconify-json/simple-icons',
    // The PWA virtual module imports this dependency at build time.
    ...(isProduction ? ['workbox-window'] : []),
  ],
}

export default config
