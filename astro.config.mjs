import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import rehypePrettyCode from 'rehype-pretty-code'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rehypePrettyCodeConfig = {
  syntaxHighlight: false,
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: 'github-dark',
        transformers: [
          transformerCopyButton({
            visibility: 'hover',
            feedbackDuration: 3000,
          }),
        ],
      },
    ],
  ],
}

// https://astro.build/config
export default defineConfig({
  site: 'https://johnsonmao.github.io',
  output: 'static',

  markdown: { ...rehypePrettyCodeConfig },

  integrations: [
    sitemap(),
    icon(),
    mdx({ ...rehypePrettyCodeConfig }),
    AstroPWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}', 'offline/index.html', 'en/offline/index.html'],
      },
      manifest: {
        name: "JohnsonMao's Blog",
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
        enabled: false,
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
