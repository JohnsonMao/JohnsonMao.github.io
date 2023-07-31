import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { getDictionary } from '~/i18n';
import PostList from '@/components/layouts/PostList';
import { getSortedPostList } from '@/utils/mdx';
import type { RootParams } from './layout';

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  if (!lang) notFound();

  const dict = await getDictionary(lang);

  return {
    title: dict.notes,
  };
}

async function RootPage({ params: { lang } }: RootParams) {
  if (!lang) notFound();

  const posts = await getSortedPostList();
  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto px-6">
      <section className="mx-auto w-full">
        <Image
          className="mx-auto mt-12 rounded-full border-4 border-black shadow-black drop-shadow-xl dark:border-slate-500"
          src="/assets/mao.jpg"
          width={200}
          height={200}
          alt="Johnson Mao"
        />
      </section>
      <p className="my-12 text-center text-3xl dark:text-white">{dict.title}</p>
      <PostList posts={posts} />
    </main>
  );
}

export default RootPage;
