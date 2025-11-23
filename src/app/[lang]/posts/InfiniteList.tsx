'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { memo, Suspense } from 'react';
import Button from '@/components/Button';
import List from '@/components/List';
import { clamp } from '@/utils/math';
import Article from '../(home)/Article';

type PostListProps = {
  items: DataFrontmatter[];
};

const MemoArticle = memo(Article);

function PostList({ items }: PostListProps) {
  const searchParams = useSearchParams();
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const total = items.length;
  const clampLimit = clamp(1, total);
  const t = useTranslations('common');

  return (
    <>
      <List Item={MemoArticle} items={items.slice(0, limit)} />
      {limit < total && (
        <div className="my-4 flex justify-center">
          <Button
            href={`?limit=${clampLimit(limit + 10)}`}
            scroll={false}
            replace
          >
            {t('morePosts')}
          </Button>
        </div>
      )}
    </>
  );
}

function InfiniteList({ items }: PostListProps) {
  return (
    <Suspense fallback={<List Item={MemoArticle} items={items.slice(0, 10)} />}>
      <PostList items={items} />
    </Suspense>
  );
}

export default InfiniteList;
