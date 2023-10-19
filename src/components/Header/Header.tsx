'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { usePathname } from 'next/navigation';
import { CSSProperties, useEffect, useRef } from 'react';

import useScroll from '@/hooks/useScroll';
import cn from '@/utils/cn';
import getLocale from '@/utils/getLocale';
import { clamp } from '@/utils/math';

import Container from '../Container';
import Image from '../Image';
import Link from '../Link';
import ThemeSwitcher from '../ThemeSwitcher';

type MenuItem = {
  text: string;
  href: LinkWithoutLocalePathProps['href'];
};

type Avatar = {
  src: string | StaticImport;
  alt: string;
};

export type HeaderProps = {
  avatar: Avatar;
  menu: MenuItem[];
  scrollThreshold?: number;
};

function Header({ avatar, menu, scrollThreshold = 100 }: HeaderProps) {
  const pathname = usePathname();
  const [scroll] = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerTranslateY = useRef(0);
  const previousScrollY = useRef(0);
  const currentScrollY = Math.floor(scroll.y);
  const avatarTranslateY = (
    clamp(currentScrollY * -1, scrollThreshold * -1) + scrollThreshold
  ).toFixed(2);
  const avatarScale = (
    1.5 -
    clamp(currentScrollY, scrollThreshold) / (scrollThreshold * 2)
  ).toFixed(2);

  const calcHeaderTranslateY = () => {
    const scrollY = currentScrollY - scrollThreshold;

    if (scrollY <= 0) return headerTranslateY.current = 0;

    const deltaScrollY = previousScrollY.current - scrollY;
    const headerHeight = headerRef.current?.clientHeight || 0;
    const newHeaderTranslateY = clamp(
      headerTranslateY.current + deltaScrollY,
      headerHeight * -1
    );

    previousScrollY.current = scrollY;
    headerTranslateY.current = newHeaderTranslateY;

    return newHeaderTranslateY;
  }

  const headerStyles = {
    '--header-translate-y': `${calcHeaderTranslateY()}px`,
  } as CSSProperties;

  const avatarStyles = {
    '--avatar-translate-y': `${avatarTranslateY}px`,
    '--avatar-scale': avatarScale,
  } as CSSProperties;

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
      className="sticky top-0 z-10 flex translate-y-[var(--header-translate-y)] items-center justify-between py-7"
      style={headerStyles}
    >
      <Link
        href="/"
        className="origin-bottom-left translate-y-[var(--avatar-translate-y)] scale-[var(--avatar-scale)]"
        style={avatarStyles}
      >
        <Image
          className="rounded-full shadow-black drop-shadow-xl"
          width={40}
          height={40}
          src={avatar.src}
          alt={avatar.alt}
          priority
        />
      </Link>
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
