'use client';

import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import List from '@/components/List';
import { clamp } from '@/utils/math';
import Article from '../(home)/Article';

type InfiniteListProps = {
  items: DataFrontmatter[];
  morePostsText: string;
};

const MemoArticle = memo(Article);

function InfiniteList({ items, morePostsText }: InfiniteListProps) {
  const searchParams = useSearchParams();
  const total = items.length;
  const clampLimit = clamp(1, total);
  const limit = clampLimit(parseInt(searchParams.get('limit') || '10', 10));

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
            {morePostsText}
          </Button>
        </div>
      )}
    </>
  );
}

export default InfiniteList;
