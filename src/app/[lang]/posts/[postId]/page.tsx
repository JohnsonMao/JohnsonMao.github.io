import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Comment from '@/components/Comment';
import Container from '@/components/Container';
import { H1 } from '@/components/Heading';
import Link from '@/components/Link';
import TableOfContents from '@/components/TableOfContents';
import { formatDate } from '@/utils/date';
import { getAllDataFrontmatter, getDataById } from '@/utils/mdx';

export async function generateStaticParams() {
  const posts = await getAllDataFrontmatter('posts');

  return posts.map(({ id }) => ({ postId: id }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/posts/[postId]'>): Promise<Metadata> {
  const { postId } = await params;
  const post = await getDataById('posts', postId);

  if (!post) return notFound();

  return post.frontmatter;
}

async function PostPage({ params }: PageProps<'/[lang]/posts/[postId]'>) {
  const { postId } = await params;
  const post = await getDataById('posts', postId);

  if (!post) return notFound();

  const { content, frontmatter } = post;
  const formattedDate = formatDate(frontmatter.date);
  const id = `article-${postId}`;

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 font-bold text-3xl">{frontmatter.title}</H1>
        <time>{formattedDate}</time>
      </Container>
      <Container as="main" className="block py-8 lg:flex lg:px-2">
        <aside className="hidden w-40 shrink-0 lg:block xl:w-60">
          <nav className="sticky top-header-height px-4">
            <h4 className="my-3 font-semibold text-gray-900 text-lg dark:text-gray-100">
              目錄
            </h4>
            <TableOfContents
              className="max-h-96 overflow-auto"
              targetId={`#${id}`}
            />
          </nav>
        </aside>
        <div>
          <article
            id={id}
            className="prose prose-zinc dark:prose-invert mx-auto px-4"
          >
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
