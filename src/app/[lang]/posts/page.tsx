import type { Metadata } from 'next';

import { getDictionary } from '~/i18n';
import { H1 } from '@/components/Heading';
import Card from '@/components/Card';
import Container from '@/components/Container';
import List from '@/components/List';
import { getAllDataFrontmatter } from '@/utils/mdx';
import type { RootParams } from '../layout';

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
  const { common } = await getDictionary(lang);

  return (
    <Container as="main">
      <H1 className="my-12 text-center text-3xl dark:text-white">
        {common.slogan}
      </H1>
      <List Item={Card} items={posts} />
    </Container>
  );
}

export default RootPage;
