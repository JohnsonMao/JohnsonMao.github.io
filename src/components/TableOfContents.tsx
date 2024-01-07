'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import cn from '@/utils/cn';
import Collapse from './Collapse';
import Link from './Link';

type TableOfContentsProps = {
  targetId: `#${string}`;
  className?: string;
};

type Heading = {
  id: string;
  text: string | undefined;
  children?: Heading[];
};

function TableOfContents({ className, targetId }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [entry, setElementRef] = useIntersectionObserver();

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(`${targetId} h2, ${targetId} h3`)
    );
    setElementRef(headingElements);
    setHeadings(
      headingElements.reduce<Heading[]>(
        (result, { id, tagName, textContent }) => {
          const heading = { id, text: textContent?.slice(1) };
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
  }, [targetId, setElementRef]);

  useLayoutEffect(() => {
    const visibleHeadings = entry.filter(
      ({ isIntersecting }) => isIntersecting
    );

    if (visibleHeadings.length > 0) {
      setActiveId(visibleHeadings[0].target.id);
    }
  }, [entry]);

  const isActive = (id: string, children: Heading[]) =>
    id === activeId || children.some((child) => child.id === activeId);

  const getLinkClassName = (id: string, children: Heading[] = []) =>
    cn(
      'transition-colors mb-0.5 block overflow-hidden text-ellipsis whitespace-nowrap hover:underline',
      isActive(id, children)
        ? 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
    );

  return (
    <nav aria-label="Table of contents" className={className}>
      <ul className="text-sm">
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
