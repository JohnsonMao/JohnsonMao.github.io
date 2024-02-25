import type { Metadata } from 'next';

import { getDictionary } from '~/data/i18n';
import Container from '@/components/Container';
import { H1 } from '@/components/Heading';
import List from '@/components/List';
import { getAllDataFrontmatter } from '@/utils/mdx';

import type { RootParams } from '../layout';
import Article from './Article';

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  const { common } = await getDictionary(lang);

  return {
    title: common.home,
  };
}

async function RootPage({ params: { lang } }: RootParams) {
  const posts = await getAllDataFrontmatter('posts');
  const { homePage, common } = await getDictionary(lang);

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 text-3xl font-bold">{homePage.title}</H1>
        <p className="text-xl">{homePage.description}</p>
      </Container>
      <Container as="main" className="py-8">
        <p className="mb-4 text-lg">{common.latestPosts}</p>
        <List Item={Article} items={posts.slice(0, 4)} />
      </Container>
    </>
  );
}

export default RootPage;
