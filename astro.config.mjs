import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://johnsonmao.github.io',
  output: 'static',

  integrations: [sitemap(), icon(), mdx()],

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
});