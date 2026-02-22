import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		lang: z.enum(['en', 'zh-TW']),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		updated: z.coerce.date().optional(),
	}),
});

const about = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
	schema: z.object({
		title: z.string(),
		lang: z.enum(['en', 'zh-TW']),
	}),
});

export const collections = { blog, about };
