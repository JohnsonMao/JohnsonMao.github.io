import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

import { H1, H2, H3, H4, H5, H6 } from '@/components/Heading';
import CodeBox from '@/components/CodeBox';
import Image from '@/components/Image';
import Link from '@/components/Link';
import rehypeImageMetadata from '@/plugins/rehypeImageMetadata';
import { DateOrDateString, compareDates } from './date';

export interface IPost {
  title: string;
  date: DateOrDateString;
  index_img: string;
  banner_img: string;
  categories: string[][];
  tags: string[];
  excerpt: string;
}

export interface IPostWithId extends IPost {
  id: string;
}

const ROOT_PATH = process.cwd();

/** Retrieve markdowns front matter sorted by date */
export async function getMarkdownsFrontMatter(type: string) {
  const dirPath = path.join(ROOT_PATH, 'markdown', type);
  const fileNames = fs.readdirSync(dirPath);
  const uniqueIdsSet = new Set();
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx?$/, '');

      if (uniqueIdsSet.has(id)) {
        throw new Error(`Duplicate id "${id}" found in "${fileName}"`);
      }
      uniqueIdsSet.add(id);

      const fullPath = path.join(dirPath, fileName);
      const source = fs.readFileSync(fullPath, 'utf8');
      const { frontmatter } = await compileMDX<IPost>({
        source,
        options: { parseFrontmatter: true },
      });

      return { ...frontmatter, id };
    })
  );

  return allPostsData.sort((a, b) => compareDates(a.date, b.date));
}

/** Retrieve markdown content and front matter for a specific markdown file by its id. */
export async function getMarkdownById(type: string, id: string) {
  const dirPath = path.join(ROOT_PATH, 'markdown', type);
  const mdxPath = path.join(dirPath, `${id}.mdx`);
  const mdPath = path.join(dirPath, `${id}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const source = fs.readFileSync(fullPath, 'utf8');
  const { content, frontmatter } = await compileMDX<IPost>({
    source,
    components: {
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      h6: H6,
      pre: CodeBox,
      img: Image as () => JSX.Element,
      a: Link as () => JSX.Element,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeCodeTitles,
          rehypePrismPlus,
          rehypeImageMetadata,
        ],
      },
    },
  });

  return { id, content, frontmatter, source };
}
