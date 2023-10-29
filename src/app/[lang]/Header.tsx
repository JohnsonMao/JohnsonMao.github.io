'use client';

import { CSSProperties, useCallback, useRef, useState } from 'react';

import Container from '@/components/Container';
import Image from '@/components/Image';
import Link from '@/components/Link';
import useScroll, { ScrollHandler } from '@/hooks/useScroll';
import useRafState from '@/hooks/useRafState';
import cn from '@/utils/cn';
import { clamp, pipe, toFixedNumber } from '@/utils/math';

type HeaderProps = {
  avatar: React.ReactNode;
  scrollThreshold?: number;
} & React.PropsWithChildren;

function Header({ avatar, children, scrollThreshold = 100 }: HeaderProps) {
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
        {children}
      </Container>
      <Container
        className={cn(
          'pointer-events-none sticky top-0 z-10 pt-7',
          !headerFixed && 'top-auto translate-y-[var(--avatar-translate-y)]',
          willChange && 'will-change-transform'
        )}
        style={avatarStyles}
      >
        {avatar}
      </Container>
    </>
  );
}

type AvatarProps = {
  src: string;
  alt: string;
};

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <Link
      href="/"
      className="pointer-events-auto inline-block origin-bottom-left scale-[var(--avatar-scale)]"
    >
      <Image
        className="rounded-full shadow-black drop-shadow-xl"
        width={42}
        height={42}
        src={src}
        alt={alt}
        priority
      />
    </Link>
  );
};

export default Header;
