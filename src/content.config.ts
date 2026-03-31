import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const TAG_IDS = ['react', 'hexschool', 'vue3-camp', 'mongodb', 'it-ironman', 'vscode', 'html', 'css', 'javascript', 'jsdc', 'typescript'] as const
export type TagId = typeof TAG_IDS[number]

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.enum(TAG_IDS)).optional(),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh-TW']),
  }),
})

export const collections = { blog, about }
