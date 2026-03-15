import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: 'https://johnsonmao.github.io',
  output: 'static',

  integrations: [
    sitemap(),
    icon(),
    mdx(),
    AstroPWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}', 'offline/index.html', 'en/offline/index.html'],
      },
      manifest: {
        name: 'JohnsonMao\'s Blog',
        short_name: 'JohnsonMao',
        description: 'Personal blog of JohnsonMao',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],

  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'zh-TW',
    prefixDefaultLocale: false,
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
  },
})
