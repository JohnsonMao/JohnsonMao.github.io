import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { H1, H2 } from '@/components/Heading';
import List from '@/components/List';
import { getAllDataFrontmatter } from '@/utils/mdx';

import Article from './Article';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');

  return {
    title: {
      template: `%s - ${t('home')}`,
      default: t('home'),
    },
  };
}

async function RootPage() {
  const posts = await getAllDataFrontmatter('posts');
  const tHomePage = await getTranslations('homePage');
  const tCommon = await getTranslations('common');
  const nextPostId = posts.at(4)?.id || '';

  return (
    <>
      <Container className="pb-8">
        <H1 className="mb-4 font-bold text-3xl">{tHomePage('title')}</H1>
        <p className="text-xl">{tHomePage('description')}</p>
      </Container>
      <Container as="main" className="py-8">
        <H2 className="mb-6 text-center text-2xl">{tCommon('latestPosts')}</H2>
        <List Item={Article} items={posts.slice(0, 4)} />
        <div className="my-4 flex justify-center">
          <Button href={`/posts#${nextPostId}`} className="text-lg">
            {tCommon('morePosts')}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default RootPage;
