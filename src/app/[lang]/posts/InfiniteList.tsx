'use client';

import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from '@/components/Link';
import List from '@/components/List';
import { clamp } from '@/utils/math';
import Article from '../Article';

type InfiniteListProps = {
  items: DataFrontmatter[];
};

const MemoArticle = memo(Article);

function InfiniteList({ items }: InfiniteListProps) {
  const searchParams = useSearchParams();
  const total = items.length;
  const clampLimit = clamp(1, total);
  const limit = clampLimit(parseInt(searchParams.get('limit') || '10', 10));

  return (
    <>
      <List Item={MemoArticle} items={items.slice(0, limit)} />
      {limit < total && (
        <Link href={`?limit=${clampLimit(limit + 10)}`} replace scroll={false}>
          更多文章
        </Link>
      )}
    </>
  );
}

export default InfiniteList;
