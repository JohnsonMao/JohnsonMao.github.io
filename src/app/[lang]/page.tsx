import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
      <section className="mx-auto w-full">
        <Image
          className="mx-auto mt-12 rounded-full border-4 border-black shadow-black drop-shadow-xl dark:border-slate-500"
          src="/static/mao.jpg"
          width={200}
          height={200}
          alt="Johnson Mao"
          priority
        />
      </section>
      <p className="my-12 text-center text-3xl dark:text-white">
        {metadata.title}
      </p>
      <PostList posts={posts} />
    </main>
  );
}

export default RootPage;
