import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/Container';
import { H1 } from '@/components/Heading';
import { getAllDataFrontmatter } from '@/utils/mdx';
import InfiniteList from './InfiniteList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');

  return {
    title: t('posts'),
  };
}

async function PostsPage() {
  const posts = await getAllDataFrontmatter('posts');
  const t = await getTranslations('postsPage');

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 font-bold text-3xl">{t('title')}</H1>
        <p className="text-xl">{t('description')}</p>
      </Container>
      <Container as="main" className="py-8">
        <InfiniteList items={posts} />
      </Container>
    </>
  );
}

export default PostsPage;
