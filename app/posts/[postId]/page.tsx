import type { Metadata, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostList } from '@/lib/posts';
import formatDate from '@/lib/formatDate';

import './prism-dracula.css';
import './prism-plus.css';

type PostPageProps = GetStaticPropsContext<{ postId: string }>;

export async function generateStaticParams() {
	const posts = await getSortedPostList();

	return posts.map((post) => ({ postId: post.id }));
}

export async function generateMetadata(
	{ params }: PostPageProps
): Promise<Metadata> {
	const posts = await getSortedPostList();
	const postId = params?.postId;
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

async function PostPage({ params }: PostPageProps) {
	const posts = await getSortedPostList();
	const postId = params?.postId;

	if (!postId || !posts.find((post) => post.id !== postId)) {
		return notFound();
	}

	const { content, frontmatter } = await getPostData(postId);
	const formattedDate = formatDate(frontmatter.date);

	return (
		<main className="prose prose-xl prose-slate mx-auto px-6 dark:prose-invert">
			<h1 className="mb-0 mt-4 text-3xl">{frontmatter.title}</h1>
			<p className="mt-0">{formattedDate}</p>
			<article>{content}</article>
			<Link href="/">回首頁</Link>
		</main>
	);
}

export default PostPage;
