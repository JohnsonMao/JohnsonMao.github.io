import Image from 'next/image';
import PostList from '@/components/PostList';
import { getSortedPostList } from '@/lib/posts';

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
					priority
				/>
			</section>
			<p className="my-12 text-center text-3xl dark:text-white">
				Hello and Welcome &nbsp;
				<span className="whitespace-nowrap">
					I&apos;m <span className="font-bold">Johnson</span>.
				</span>
			</p>
			<PostList posts={posts} />
		</main>
	);
}

export default HomePage;
