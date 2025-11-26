import fs from 'fs';
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc';
import path from 'path';
import type { JSX } from 'react';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import CodeBox from '@/components/CodeBox';
import { H2, H3, H4, H5, H6 } from '@/components/Heading';
import Image from '@/components/Image';
import Link from '@/components/Link';
import rehypeImageMetadata from '@/plugins/rehypeImageMetadata';
import { compareDates } from './date';

const ROOT_PATH = process.cwd();
const MARKDOWN_EXTENSIONS = /\.(md|mdx)$/;

/** Get directory path for a given data directory type */
const getDirPath = (dirType: DataDirType): string => {
  return path.join(ROOT_PATH, 'content', dirType);
};

/** Check if a file is a markdown file */
const isMarkdownFile = (fileName: string): boolean => {
  return MARKDOWN_EXTENSIONS.test(fileName);
};

/** Extract id from markdown filename */
const extractId = (fileName: string): string => {
  return fileName.replace(MARKDOWN_EXTENSIONS, '');
};

/** Resolve the file path for a markdown file, preferring .mdx over .md */
const resolveMarkdownPath = (dirPath: string, id: string): string => {
  const mdxPath = path.join(dirPath, `${id}.mdx`);
  const mdPath = path.join(dirPath, `${id}.md`);

  return fs.existsSync(mdxPath) ? mdxPath : mdPath;
};

/** MDX components configuration */
const mdxComponents: MDXRemoteProps['components'] = {
  h1: H2,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: CodeBox,
  img: Image as () => JSX.Element,
  a: Link as () => JSX.Element,
};

/** MDX compilation options for complete content with components */
const mdxCompilationOptions: MDXRemoteProps['options'] = {
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
};

/** Retrieve all data front matter sorted by date */
export async function getAllDataFrontmatter(
  dirType: DataDirType
): Promise<DataFrontmatter[]> {
  const dirPath = getDirPath(dirType);
  const fileNames = fs.readdirSync(dirPath);

  // Filter markdown files and extract ids
  const markdownFiles = fileNames.filter(isMarkdownFile);
  const ids = markdownFiles.map(extractId);
  const uniqueIds = new Set(ids);

  // Process files in parallel
  const frontmatterList = await Promise.all(
    ids.map(async (id) => {
      if (!uniqueIds.has(id)) {
        console.warn(`⚠️ Duplicate files detected: ${id}`);
        return null;
      }
      uniqueIds.delete(id);
      const filePath = resolveMarkdownPath(dirPath, id);
      const source = fs.readFileSync(filePath, 'utf8');
      const { frontmatter } = await compileMDX<DataFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });

      return { ...frontmatter, id };
    })
  );

  return frontmatterList
    .filter((frontmatter) => frontmatter !== null)
    .sort((a, b) => compareDates(a.date, b.date));
}

/** Retrieve data content and front matter for a specific data file by its id. */
export async function getDataById(
  dirType: DataDirType,
  id: string
): Promise<Data | null> {
  const dirPath = getDirPath(dirType);
  const filePath = resolveMarkdownPath(dirPath, id);

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<DataFrontmatter>({
      source,
      components: mdxComponents,
      options: mdxCompilationOptions,
    });

    return { id, content, frontmatter };
  } catch (_error) {
    // Return null if file doesn't exist or compilation fails
    // This maintains the API contract while handling errors gracefully
    return null;
  }
}
