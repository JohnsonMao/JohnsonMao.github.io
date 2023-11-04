import type { Metadata } from 'next';

import { getDictionary } from '~/i18n';
import { H1 } from '@/components/Heading';
import Card from '@/components/Card';
import Container from '@/components/Container';
import List from '@/components/List';
import { getAllDataFrontmatter } from '@/utils/mdx';
import type { RootParams } from './layout';

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
  const { metadata } = await getDictionary(lang);

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 text-3xl font-bold dark:text-white">
          {metadata.title}
        </H1>
        <p className="text-xl dark:text-white">{metadata.description}</p>
      </Container>
      <Container as="main" className="py-8">
        <List Item={Card} items={posts} />
      </Container>
    </>
  );
}

export default RootPage;
