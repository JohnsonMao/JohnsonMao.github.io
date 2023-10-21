'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { CSSProperties, useCallback, useRef } from 'react';

import useScroll, { ScrollHandler } from '@/hooks/useScroll';
import useRafState from '@/hooks/useRafState';
import cn from '@/utils/cn';
import { clamp, pipe, toFixedNumber } from '@/utils/math';

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
  const [headerFixed, setHeaderFixed] = useRafState(true);
  const [headerTranslateY, setHeaderTranslateY] = useRafState(0);
  const [avatarTranslateY, setAvatarTranslateY] = useRafState(0);
  const [avatarScale, setAvatarScale] = useRafState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const previousScrollY = useRef(0);

  const handleHeader = useCallback(
    (currentScrollY: number, threshold: number) => {
      const deltaScrollY = currentScrollY - previousScrollY.current;
      const isScrollingDown = deltaScrollY > 0;

      previousScrollY.current = currentScrollY;

      if (isScrollingDown) {
        if (currentScrollY < threshold) {
          setHeaderFixed(true);
        } else if (headerFixed) {
          setHeaderTranslateY(currentScrollY);
          setHeaderFixed(false);
        }
      } else {
        const headerHeight = headerRef.current?.clientHeight || 0;
        const newHeaderTranslateY = currentScrollY - headerHeight;

        if (newHeaderTranslateY > headerTranslateY) {
          setHeaderTranslateY(newHeaderTranslateY);
        } else if (currentScrollY < headerTranslateY) {
          setHeaderFixed(true);
        }
      }
    },
    [headerFixed, setHeaderFixed, headerTranslateY, setHeaderTranslateY]
  );

  const handleAvatar = useCallback(
    (currentScrollY: number, threshold: number) => {
      setAvatarTranslateY(
        pipe(
          currentScrollY * -1,
          clamp(0, threshold * -1),
          (y) => y + threshold,
          toFixedNumber(2)
        )
      );
      setAvatarScale(
        pipe(
          currentScrollY,
          clamp(0, threshold),
          (y) => y / (threshold * 2),
          (y) => 1.5 - y,
          toFixedNumber(2)
        )
      );
    },
    [setAvatarTranslateY, setAvatarScale]
  );

  const scrollHandler = useCallback<ScrollHandler>(
    ({ y }) => {
      const currentScrollY = Math.floor(y);
      handleHeader(currentScrollY, scrollThreshold);
      handleAvatar(currentScrollY, scrollThreshold);
    },
    [scrollThreshold, handleHeader, handleAvatar]
  );

  useScroll({ handler: scrollHandler, initial: true });

  const headerStyles = {
    '--header-translate-y': `${headerTranslateY}px`,
    '--avatar-translate-y': `${avatarTranslateY}px`,
    '--avatar-scale': avatarScale,
  } as CSSProperties;

  return (
    <Container
      as="header"
      ref={headerRef}
      className={cn(
        'sticky top-0 z-10 flex items-center justify-between py-7 will-change-[top]',
        !headerFixed && 'top-auto translate-y-[var(--header-translate-y)]'
      )}
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
