import type { Metadata } from 'next';

import { getDictionary } from '~/i18n';
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
  const { metadata } = await getDictionary(lang);

  return (
    <Container as="main">
      <p className="my-12 text-center text-3xl dark:text-white">
        {metadata.title}
      </p>
      <List Item={Card} items={posts} />
    </Container>
  );
}

export default RootPage;
