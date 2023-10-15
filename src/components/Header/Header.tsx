'use client';

import { usePathname } from 'next/navigation';
import { CSSProperties, useEffect, useState, useRef } from 'react';

import useScroll from '@/hooks/useScroll';
import cn from '@/utils/cn';
import getLocale from '@/utils/getLocale';
import { clamp } from '@/utils/math';

import ThemeSwitcher from '../ThemeSwitcher';
import Link from '../Link';
import Logo, { LogoProps } from './Logo';
import Container from '../Container';

type MenuItem = {
  text: string;
  href: LinkWithoutLocalePathProps['href'];
};

export type HeaderProps = {
  logo: Omit<LogoProps, 'scrollY' | 'scrollThreshold'>;
  menu: MenuItem[];
};

function Header({ logo, menu }: HeaderProps) {
  const pathname = usePathname();
  const [translateY, setTranslateY] = useState(0);
  const [scroll] = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useRef(0);
  const previousScrollY = useRef(0);
  const currentScrollY = Math.floor(scroll.y);
  const scrollThreshold = 120;

  useEffect(() => {
    headerHeight.current = headerRef.current?.clientHeight || 0;
  }, []);

  useEffect(() => {
    const scrollY = currentScrollY - scrollThreshold;

    if (scrollY <= 0) return setTranslateY(0);

    const deltaScrollY = previousScrollY.current - scrollY;

    previousScrollY.current = scrollY;

    setTranslateY((pre) =>
      clamp(pre + deltaScrollY, headerHeight.current * -1)
    );
  }, [currentScrollY]);

  const isActiveLink = (href: LinkWithoutLocalePathProps['href']) => {
    const locale = getLocale(pathname) || '';
    const localePrefix = new RegExp(`^/${locale}/?`);
    const adjustedPathname = pathname.replace(localePrefix, '/');

    if (adjustedPathname === '/') return href === '/';

    return adjustedPathname.startsWith(href) && href !== '/';
  };

  return (
    <Container
      as="header"
      ref={headerRef}
      className="sticky top-0 z-10 flex translate-y-0 items-center justify-between py-7"
      style={{ '--tw-translate-y': `${translateY}px` } as CSSProperties}
    >
      <Logo
        {...logo}
        scrollY={currentScrollY}
        scrollThreshold={scrollThreshold}
      />
      <nav>
        <ul className="flex rounded-full bg-gray-900/60 px-2 backdrop-blur-md">
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
      <ThemeSwitcher className="rounded-full bg-gray-900/60 p-3 backdrop-blur-md" />
    </Container>
  );
}

export default Header;
