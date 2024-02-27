import type { Metadata } from 'next';

import { getDictionary } from '~/data/i18n';
import Container from '@/components/Container';
import { H1, H2 } from '@/components/Heading';
import Button from '@/components/Button';
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
  const nextPostId = posts.at(4)?.id || '';

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 text-3xl font-bold">{homePage.title}</H1>
        <p className="text-xl">{homePage.description}</p>
      </Container>
      <Container as="main" className="py-8">
        <H2 className="mb-6 text-center text-2xl">{common.latestPosts}</H2>
        <List Item={Article} items={posts.slice(0, 4)} />
        <div className="my-4 flex justify-center">
          <Button href={`/posts#${nextPostId}`} className="text-lg">
            {common.morePosts}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default RootPage;
