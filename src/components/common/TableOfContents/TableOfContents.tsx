'use client';

import { useEffect, useState } from 'react';
import GithubSlugger from 'github-slugger';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import cn from '@/utils/cn';
import Link from '../Link';

type TableOfContentsProps = {
  source: string;
};

function TableOfContents({ source }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [entry, setElementRef] = useIntersectionObserver();

  const headingLines = source
    .split('\n')
    .filter((line) => line.match(/^###?\s/));

  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slugger = new GithubSlugger();
    const id = slugger.slug(text);

    return { text, level, id };
  });

  useEffect(() => {
    setElementRef(
      Array.from(document.querySelectorAll('article h2, article h3'))
    );
  }, [setElementRef]);

  useEffect(() => {
    const visibleHeadings = entry.flatMap((headingElement) => {
      if (headingElement.isIntersecting) return headingElement;
      return [];
    });

    if (visibleHeadings.length > 0) {
      setActiveId(visibleHeadings[0].target.id);
    }
  }, [entry]);

  return (
    <nav aria-label="Table of contents">
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={cn(
                'mb-3 text-left text-sm transition-colors hover:underline',
                heading.id === activeId
                  ? 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium'
                  : 'font-normal text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
                heading.level === 3 && 'pl-4'
              )}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
