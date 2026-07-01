import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

export const TAG_IDS = [
  'react',
  'hexschool',
  'vue3-camp',
  'mongodb',
  'it-ironman',
  'vscode',
  'html',
  'css',
  'javascript',
  'jsdc',
  'typescript',
] as const
export type TagId = (typeof TAG_IDS)[number]

export const SERIES_IDS = ['front-end-skills-journey', 'vue3-beginner-camp', 'react-guide', 'typescript-guide'] as const
export type SeriesId = (typeof SERIES_IDS)[number]

const CONTENT_EXT_RE = /\.(md|mdx)$/

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(CONTENT_EXT_RE, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.enum(TAG_IDS)).optional(),
    series: z.enum(SERIES_IDS).optional(),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
  }),
})

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    lang: z.enum(['zh-TW', 'en']).default('zh-TW'),
    tags: z.array(z.enum(TAG_IDS)).optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { blog, about, notes }
