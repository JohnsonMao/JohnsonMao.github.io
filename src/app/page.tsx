import Image from 'next/image';
import PostList from '@components/PostList';
import { getSortedPostList } from '@utils/posts';
import { getConfig } from '@utils/config';

const { banner } = getConfig();

async function HomePage() {
  const posts = await getSortedPostList();

  return (
    <main className="mx-auto px-6">
      <section className="mx-auto w-full">
        <Image
          className="mx-auto mt-12 rounded-full border-4 border-black shadow-black drop-shadow-xl dark:border-slate-500"
          src="/images/mao.jpg"
          width={200}
          height={200}
          alt="Johnson Mao"
        />
      </section>
      <p className="my-12 text-center text-3xl dark:text-white">
        {banner.title}
      </p>
      <PostList posts={posts} />
    </main>
  );
}

export default HomePage;
