import Image from 'next/image';

import PostList from '@/components/layouts/PostList';
import i18n, { locales } from '@/i18n';
import { getSortedPostList } from '@/utils/posts';

export type RootProps = {
  params: {
    lng: (typeof locales)[number];
  };
};

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

async function RootPage({ params: { lng } }: RootProps) {
  const posts = await getSortedPostList();
  const { t } = i18n;

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
      <p className="my-12 text-center text-3xl dark:text-white">
        {t('title', { lng, ns: 'common' })}
      </p>
      <PostList posts={posts} />
    </main>
  );
}

export default RootPage;
