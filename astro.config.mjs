import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://johnsonmao.github.io',
  output: 'static',

  integrations: [sitemap()],

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