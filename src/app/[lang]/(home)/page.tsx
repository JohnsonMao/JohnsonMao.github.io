import type { Metadata } from 'next';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { H1, H2 } from '@/components/Heading';
import List from '@/components/List';
import { getAllDataFrontmatter } from '@/utils/mdx';
import { getDictionary } from '~/data/i18n';

import type { RootParams } from '../layout';
import Article from './Article';

export async function generateMetadata(props: RootParams): Promise<Metadata> {
  const params = await props.params;

  const { lang } = params;

  const { common } = await getDictionary(lang);

  return {
    title: common.home,
  };
}

async function RootPage(props: RootParams) {
  const params = await props.params;

  const { lang } = params;

  const posts = await getAllDataFrontmatter('posts');
  const { homePage, common } = await getDictionary(lang);
  const nextPostId = posts.at(4)?.id || '';

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 font-bold text-3xl">{homePage.title}</H1>
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
