'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { CSSProperties, useRef } from 'react';

import useScroll from '@/hooks/useScroll';
import { clamp } from '@/utils/math';

import Container from '../Container';
import Image from '../Image';
import Link from '../Link';
import ThemeSwitcher from '../ThemeSwitcher';
import Menu, { MenuProps } from './Menu';

type Avatar = {
  src: string | StaticImport;
  alt: string;
};

export type HeaderProps = {
  avatar: Avatar;
  scrollThreshold?: number;
} & MenuProps;

function Header({ avatar, menu, scrollThreshold = 100 }: HeaderProps) {
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
    const scrollPosition = currentScrollY - scrollThreshold;

    if (scrollPosition <= 0) {
      headerTranslateY.current = 0;
    } else {
      const deltaScrollY = previousScrollY.current - scrollPosition;
      const headerHeight = headerRef.current?.clientHeight || 0;

      previousScrollY.current = scrollPosition;
      headerTranslateY.current = clamp(
        headerTranslateY.current + deltaScrollY,
        headerHeight * -1
      );
    }

    return headerTranslateY.current;
  };

  const headerStyles = {
    '--header-translate-y': `${calcHeaderTranslateY()}px`,
    '--avatar-translate-y': `${avatarTranslateY}px`,
    '--avatar-scale': avatarScale,
  } as CSSProperties;

  return (
    <Container
      as="header"
      ref={headerRef}
      className="sticky top-0 z-10 flex translate-y-[var(--header-translate-y)] items-center justify-between py-7 will-change-transform"
      style={headerStyles}
    >
      <Link
        href="/"
        className="origin-bottom-left translate-y-[var(--avatar-translate-y)] scale-[var(--avatar-scale)]"
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
      <Menu menu={menu} />
      <ThemeSwitcher className="rounded-full bg-gray-900/60 p-3 backdrop-blur-md" />
    </Container>
  );
}

export default Header;
