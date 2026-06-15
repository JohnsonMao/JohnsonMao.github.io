import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: [
    'src/sw.ts',
    'src/glob.loader.ts',
  ],

  project: ['src/**/*.{ts,astro}'],

  ignoreDependencies: [
    'tailwindcss',
    '@tailwindcss/typography',
    '@iconify-json/lucide',
  ],
}

export default config
