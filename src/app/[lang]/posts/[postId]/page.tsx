import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Link from '@/components/Link';
import TableOfContents from '@/components/TableOfContents';
import Comment from '@/components/Comment';
import { getDataById, getAllDataFrontmatter } from '@/utils/mdx';
import { formatDate } from '@/utils/date';

type PostParams = {
  params: { postId: string };
};

export async function generateStaticParams() {
  const posts = await getAllDataFrontmatter('posts');

  return posts.map((post) => ({ postId: post.id }));
}

export async function generateMetadata({
  params: { postId },
}: PostParams): Promise<Metadata> {
  const posts = await getAllDataFrontmatter('posts');
  const post = posts.find((post) => post.id === postId);

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.excerpt,
  };
}

async function PostPage({ params: { postId } }: PostParams) {
  const posts = await getAllDataFrontmatter('posts');
  const post = posts.find((post) => post.id === postId);

  if (!post) return notFound();

  const { content, frontmatter, source } = await getDataById(
    'posts',
    postId
  );
  const formattedDate = formatDate(frontmatter.date);

  return (
    <>
      <aside className="fixed bottom-0 left-4 top-16 w-40 overflow-auto">
        <p className="my-3 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
          目錄
        </p>
        <TableOfContents source={source} />
      </aside>
      <main className="prose prose-xl prose-slate mx-auto px-6 dark:prose-invert">
        <h1 className="mb-0 mt-4 text-3xl">{frontmatter.title}</h1>
        <p className="mt-0">{formattedDate}</p>
        <article>{content}</article>
        <Link href="/">回首頁</Link>
        <Comment />
      </main>
    </>
  );
}

export default PostPage;
