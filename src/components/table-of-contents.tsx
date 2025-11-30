'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHeaderHeight } from '@/contexts/header-height-context';
import useScroll, { ScrollHandler } from '@/hooks/use-scroll';
import cn from '@/utils/cn';
import Collapse from './collapse1';
import Link from './link1';

type HeadingType = {
  id: string;
  offsetTop: number;
  text: string | undefined;
  children?: HeadingType[];
};

type HeadingOffsetType = {
  id: string;
  offsetTop: number;
};

type TableOfContentsProps = {
  targetId: `#${string}`;
};

function TableOfContents({ targetId }: TableOfContentsProps) {
  const { headerHeight } = useHeaderHeight();
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const headingOffsets = useMemo<HeadingOffsetType[]>(
    () =>
      headings
        .flatMap<HeadingOffsetType>(({ id, offsetTop, children }) => [
          { id, offsetTop },
          ...(children || []).map<HeadingOffsetType>((child) => ({
            id: child.id,
            offsetTop: child.offsetTop,
          })),
        ])
        .sort((a, b) => b.offsetTop - a.offsetTop),
    [headings]
  );

  const handleScroll = useCallback<ScrollHandler>(
    ({ y }) => {
      const visibleHeading = headingOffsets.find(
        ({ offsetTop }) => Math.ceil(y + headerHeight) >= offsetTop
      );
      setActiveId(visibleHeading?.id || '');
    },
    [headingOffsets, headerHeight]
  );

  useScroll({ handler: handleScroll, initial: true });

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        `${targetId} h2, ${targetId} h3`
      )
    );
    setHeadings(
      headingElements.reduce<HeadingType[]>(
        (result, { id, offsetTop, tagName, textContent }) => {
          const heading = { id, offsetTop, text: textContent?.slice(1) };
          const lastHeading = result.at(-1);

          if (tagName === 'H2') {
            result.push(heading);
          } else if (lastHeading) {
            lastHeading.children = (lastHeading.children || []).concat(heading);
          }
          return result;
        },
        []
      )
    );
  }, [targetId]);

  const isActive = (id: string, children: HeadingType[]) =>
    id === activeId || children.some((child) => child.id === activeId);

  const getLinkClassName = (id: string, children: HeadingType[] = []) =>
    cn(
      'transition-colors mb-0.5 block overflow-hidden text-ellipsis whitespace-nowrap hover:underline',
      isActive(id, children)
        ? 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
    );

  return (
    <nav
      className="sticky px-4"
      aria-label="Table of contents"
      style={{ top: `${headerHeight}px` }}
    >
      <h4 className="my-3 font-semibold text-gray-900 text-lg dark:text-gray-100">
        目錄
      </h4>
      <ul className="group max-h-96 overflow-auto text-sm">
        {headings.map(({ id, text, children }) => (
          <li key={id}>
            <Link href={`#${id}`} className={getLinkClassName(id, children)}>
              {text}
            </Link>
            {children && (
              <Collapse isOpen={isActive(id, children)}>
                <ul className="pb-0.5 pl-4">
                  {children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`#${child.id}`}
                        className={getLinkClassName(child.id)}
                      >
                        {child.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
