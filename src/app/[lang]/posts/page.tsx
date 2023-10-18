import type { Metadata } from 'next';

import { getDictionary } from '~/i18n';
import Card from '@/components/Card';
import Container from '@/components/Container';
import { H1 } from '@/components/Heading';
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
      <H1 className="pb-6 pl-16 pt-12 text-3xl font-bold dark:text-white">
        {metadata.title}
      </H1>
      <p className="pb-16 text-xl dark:text-white">{metadata.description}</p>
      <List Item={Card} items={posts} />
    </Container>
  );
}

export default RootPage;
