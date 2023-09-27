import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/Container';
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
  const post = await getDataById('posts', postId);

  if (!post) return notFound();

  return post.frontmatter;
}

async function PostPage({ params: { postId } }: PostParams) {
  const post = await getDataById('posts', postId);

  if (!post) return notFound();

  const { content, frontmatter, source } = post;
  const formattedDate = formatDate(frontmatter.date);

  return (
    <>
      <aside className="fixed bottom-0 left-4 top-16 w-40 overflow-auto">
        <p className="my-3 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
          目錄
        </p>
        <TableOfContents source={source} />
      </aside>
      <Container as="main" className="prose prose-xl prose-slate dark:prose-invert">
        <h1 className="mb-0 mt-4 text-3xl">{frontmatter.title}</h1>
        <p className="mt-0">{formattedDate}</p>
        <article>{content}</article>
        <Link href="/">回首頁</Link>
        <Comment />
      </Container>
    </>
  );
}

export default PostPage;
