'use client';

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
  const pathname = usePathname();
  const locale = getLocale(pathname) || '';
  const localePrefix = new RegExp(`^/${locale}/?([^/]*)/?`);
  const rootPathname = localePrefix.exec(pathname)?.[1];
  const activeLinkIndex = menu.findIndex(
    (item) => item.href === `/${rootPathname}`
  );

  return (
    <nav>
      <ul
        className={cn(
          'fluorescent-box flex rounded-full px-2 backdrop-blur-sm',
          'bg-zinc-100/80 dark:bg-zinc-900/80'
        )}
      >
        {menu.map(({ text, href }, index) => (
          <li key={text}>
            <Link
              href={href}
              className={cn(
                'relative block p-3 text-xl leading-none no-underline',
                'text-zinc-700 transition-colors hover:text-primary-500 dark:text-zinc-300 dark:hover:text-primary-500',
                activeLinkIndex === index &&
                  'fluorescent-text text-primary-500 dark:text-primary-500'
              )}
            >
              {text}
              {activeLinkIndex === index && (
                <span className="absolute bottom-0 left-0 h-px w-full translate-y-1/2 bg-gradient-to-l from-transparent from-15% via-primary-500 to-transparent to-85%" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
