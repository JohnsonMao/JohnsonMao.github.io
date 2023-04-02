import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import getFormattedDate from '@/lib/getFormattedDate';

type PostProps = {
	params: { postId: string };
};

export function generateStaticParams() {
	const posts = getSortedPostsData();

	return posts.map((post) => ({ postId: post.id }));
}

export function generateMetadata({ params }: PostProps) {
	const posts = getSortedPostsData();
	const { postId } = params;
	const post = posts.find((post) => post.id === postId);

	if (!post) {
		return {
			title: '此頁面不存在',
		};
	}

	return {
		title: post.title,
	};
}

async function Post({ params }: PostProps) {
	const posts = getSortedPostsData();
	const { postId } = params;

	if (!posts.find((post) => post.id !== postId)) {
		return notFound();
	}

	const { title, date, contentHtml } = await getPostData(postId);
	const formattedDate = getFormattedDate(date);

	return (
		<main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
			<h1 className="text-3xl mt-4 mb-0">{title}</h1>
			<p className="mt-0">{formattedDate}</p>
			<article>
				<section dangerouslySetInnerHTML={{ __html: contentHtml }} />
				<p>
					<Link href="/">回首頁</Link>
				</p>
			</article>
		</main>
	);
}

export default Post;
