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
import { compareDates } from './date';

const ROOT_PATH = process.cwd();

/** Retrieve all data front matter sorted by date */
export async function getAllDataFrontmatter(dirType: DataDirType) {
  const dirPath = path.join(ROOT_PATH, 'data', dirType);
  const fileNames = fs.readdirSync(dirPath);
  const uniqueIdsSet = new Set();
  const allData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx?$/, '');

      if (uniqueIdsSet.has(id)) {
        throw new Error(`Duplicate id "${id}" found in "${fileName}"`);
      }
      uniqueIdsSet.add(id);

      const fullPath = path.join(dirPath, fileName);
      const source = fs.readFileSync(fullPath, 'utf8');
      const { frontmatter } = await compileMDX<DataFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });

      return { ...frontmatter, id };
    })
  );

  return allData.sort((a, b) => compareDates(a.date, b.date));
}

/** Retrieve data content and front matter for a specific data file by its id. */
export async function getDataById(type: string, id: string) {
  const dirPath = path.join(ROOT_PATH, 'data', type);
  const mdxPath = path.join(dirPath, `${id}.mdx`);
  const mdPath = path.join(dirPath, `${id}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const source = fs.readFileSync(fullPath, 'utf8');
  const { content, frontmatter } = await compileMDX<DataFrontmatter>({
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
