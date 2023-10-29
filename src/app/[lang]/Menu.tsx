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

  const isActiveLink = (href: DynamicRoutesWithoutLocalePath) => {
    const locale = getLocale(pathname) || '';
    const localePrefix = new RegExp(`^/${locale}/?`);
    const adjustedPathname = pathname.replace(localePrefix, '/');

    if (adjustedPathname === '/') return href === '/';

    return adjustedPathname.startsWith(href) && href !== '/';
  };

  return (
    <nav>
      <ul className="flex rounded-full bg-gray-900/60 px-2 backdrop-blur-lg">
        {menu.map(({ text, href }) => (
          <li key={text}>
            <Link
              href={href}
              className={cn(
                'block p-3 text-xl leading-none text-white/90 no-underline hover:text-white',
                isActiveLink(href) && 'text-blue-500 hover:text-blue-500'
              )}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
