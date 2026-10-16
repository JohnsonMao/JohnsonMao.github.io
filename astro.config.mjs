import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import rehypePrettyCode from 'rehype-pretty-code'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rehypePlugins = [
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
]

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://a-mao.pages.dev',
  output: 'static',

  markdown: { syntaxHighlight: false, rehypePlugins },

  integrations: [sitemap(), icon(), mdx({ syntaxHighlight: false, rehypePlugins })],

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
