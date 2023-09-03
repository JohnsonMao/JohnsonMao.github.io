import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getDictionary } from '~/i18n';
import PostList from '@/components/PostList';
import { getAllDataFrontmatter } from '@/utils/mdx';
import type { RootParams } from './layout';

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  if (!lang) notFound();

  const { common } = await getDictionary(lang);

  return {
    title: common.posts,
  };
}

async function RootPage({ params: { lang } }: RootParams) {
  if (!lang) notFound();

  const posts = await getAllDataFrontmatter('posts');
  const { metadata } = await getDictionary(lang);

  return (
    <main className="mx-auto px-6">
      <p className="my-12 text-center text-3xl dark:text-white">
        {metadata.title}
      </p>
      <PostList posts={posts} />
    </main>
  );
}

export default RootPage;
