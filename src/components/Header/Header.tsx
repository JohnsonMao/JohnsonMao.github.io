'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { CSSProperties, useCallback, useRef, useState } from 'react';

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
  const [avatarScale, setAvatarScale] = useRafState(0);
  const [willChange, setWillChange] = useState(true);
  const [avatarTranslateY, setAvatarTranslateY] = useState(0);
  const [headerTranslateY, setHeaderTranslateY] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const previousScrollY = useRef(0);

  const scrollHandler = useCallback<ScrollHandler>(
    ({ y }) => {
      const currentScrollY = Math.floor(y);
      const headerHeight = headerRef.current?.clientHeight || 0;
      const deltaScrollY = currentScrollY - previousScrollY.current;
      const isScrollingDown = deltaScrollY > 0;

      previousScrollY.current = currentScrollY;

      if (isScrollingDown) {
        if (currentScrollY < scrollThreshold) {
          setHeaderFixed(true);
        } else if (headerFixed) {
          setHeaderTranslateY(currentScrollY);
          setAvatarTranslateY(currentScrollY - headerHeight);
          setHeaderFixed(false);
        }
      } else {
        const newHeaderTranslateY = currentScrollY - headerHeight;

        if (newHeaderTranslateY > headerTranslateY) {
          setHeaderTranslateY(newHeaderTranslateY);
          setAvatarTranslateY(newHeaderTranslateY - headerHeight);
        } else if (currentScrollY < headerTranslateY) {
          setHeaderFixed(true);
        }
      }

      setWillChange(currentScrollY < scrollThreshold + 100);
      setAvatarScale(
        pipe(
          currentScrollY,
          clamp(0, scrollThreshold),
          (y) => y / (scrollThreshold * 2),
          (y) => 1.5 - y,
          toFixedNumber(2)
        )
      );
    },
    [scrollThreshold, headerFixed, headerTranslateY, setAvatarScale]
  );

  useScroll({ handler: scrollHandler, initial: true });

  const headerStyles = {
    '--header-translate-y': `${headerTranslateY}px`,
  } as CSSProperties;

  const avatarStyles = {
    '--avatar-translate-y': `${avatarTranslateY}px`,
    '--avatar-scale': avatarScale,
  } as CSSProperties;

  return (
    <>
      <Container
        as="header"
        ref={headerRef}
        className={cn(
          'sticky top-0 z-10 flex items-center justify-between py-7 before:w-11 before:content-[""]',
          !headerFixed && 'top-auto translate-y-[var(--header-translate-y)]',
          willChange && 'will-change-[top]'
        )}
        style={headerStyles}
      >
        <Menu menu={menu} />
        <ThemeSwitcher className="rounded-full bg-gray-900/60 p-3 backdrop-blur-md" />
      </Container>
      <Container
        className={cn(
          'sticky top-0 z-10 pt-7',
          !headerFixed && 'top-auto translate-y-[var(--avatar-translate-y)]',
          willChange && 'will-change-transform'
        )}
        style={avatarStyles}
      >
        <Link
          href="/"
          className="inline-block origin-bottom-left scale-[var(--avatar-scale)]"
        >
          <Image
            className="rounded-full shadow-black drop-shadow-xl"
            width={42}
            height={42}
            src={avatar.src}
            alt={avatar.alt}
            priority
          />
        </Link>
      </Container>
    </>
  );
}

export default Header;
