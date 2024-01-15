'use client';

import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import Link from '@/components/Link';
import cn from '@/utils/cn';
import getLocale from '@/utils/getLocale';

type MenuItem = {
  text: string;
  href: DynamicRoutesWithoutLocalePath;
};

export type MenuProps = {
  menu: MenuItem[];
};

function Menu({ menu }: MenuProps) {
  const [offset, setOffset] = useState({ left: 0, width: 16 });
  const menuRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const locale = getLocale(pathname) || '';
  const localePrefix = new RegExp(`^/${locale}/?([^/]*)/?`);
  const rootPathname = localePrefix.exec(pathname)?.[1];
  const activeLinkIndex = menu.findIndex(
    (item) => item.href === `/${rootPathname}`
  );

  const menuStyle = {
    '--active-offset-w': (offset.width - 16) / 40,
    '--active-offset-x': `${offset.left + 8}px`,
  } as CSSProperties;

  useLayoutEffect(() => {
    const itemElement = menuRef.current?.children[activeLinkIndex];

    if (itemElement instanceof HTMLElement) {
      setOffset({
        left: itemElement.offsetLeft,
        width: itemElement.offsetWidth,
      });
    }
  }, [activeLinkIndex]);

  return (
    <nav className="relative" style={menuStyle}>
      <ul
        ref={menuRef}
        className={cn(
          'neon-box flex rounded-full px-2 backdrop-blur-sm',
          'bg-zinc-100/80 dark:bg-zinc-900/80'
        )}
      >
        {menu.map(({ text, href }, index) => (
          <li key={text}>
            <Link
              href={href}
              className={cn(
                'block p-3 text-xl leading-none no-underline',
                'text-zinc-800 dark:text-zinc-200',
                activeLinkIndex === index
                  ? 'neon-text text-primary-600 dark:text-primary-400'
                  : 'hover:text-primary-800 dark:hover:text-primary-200'
              )}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
      <span
        className={cn(
          'absolute bottom-0 left-0 h-px w-10',
          'origin-left translate-x-[var(--active-offset-x)] translate-y-1/3 scale-x-[var(--active-offset-w)] transition-transform',
          'bg-gradient-to-r from-transparent via-primary-600 to-transparent dark:via-primary-400'
        )}
      />
    </nav>
  );
}

export default Menu;
