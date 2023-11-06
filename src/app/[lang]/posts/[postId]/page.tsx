import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/Container';
import { H1 } from '@/components/Heading';
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

  return posts.map(({ id }) => ({ postId: id }));
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
      <Container className="pb-8">
        <H1 className="mb-4 text-3xl font-bold dark:text-white">
          {frontmatter.title}
        </H1>
        <time>{formattedDate}</time>
      </Container>
      <Container as="main" className="mx-2 block py-8 lg:flex lg:px-2">
        <aside className="hidden w-40 shrink-0 lg:block xl:w-60">
          <nav className="sticky top-[var(--header-height)] px-4">
            <h4 className="my-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              目錄
            </h4>
            <TableOfContents source={source} />
          </nav>
        </aside>
        <div>
          <article className="prose prose-xl prose-slate mx-auto dark:prose-invert">
            {content}
          </article>
          <Link href="/">回首頁</Link>
          <Comment />
        </div>
      </Container>
    </>
  );
}

export default PostPage;
