import type { Metadata } from 'next';

import { getDictionary } from '~/data/i18n';
import Container from '@/components/Container';
import { H1 } from '@/components/Heading';
import { getAllDataFrontmatter } from '@/utils/mdx';

import type { RootParams } from '../layout';
import InfiniteList from './InfiniteList';

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  const { common } = await getDictionary(lang);

  return {
    title: common.posts,
  };
}

async function RootPage({ params: { lang } }: RootParams) {
  const posts = await getAllDataFrontmatter('posts');
  const { postsPage, common } = await getDictionary(lang);

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 text-3xl font-bold">{postsPage.title}</H1>
        <p className="text-xl">{postsPage.description}</p>
      </Container>
      <Container as="main" className="py-8">
        <InfiniteList items={posts} morePostsText={common.morePosts} />
      </Container>
    </>
  );
}

export default RootPage;
