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
  const [headerTranslateY, setHeaderTranslateY] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(true);
  const previousScrollY = useRef(0);

  const scrollHandler = useCallback<ScrollHandler>(
    ({ y }) => {
      const currentScrollY = Math.floor(y);
      const deltaScrollY = currentScrollY - previousScrollY.current;
      const isScrollingDown = deltaScrollY > 0;

      previousScrollY.current = currentScrollY;

      if (isScrollingDown) {
        if (currentScrollY < scrollThreshold) {
          setHeaderFixed(true);
        } else if (headerFixed) {
          setHeaderTranslateY(currentScrollY - scrollThreshold);
          setHeaderFixed(false);
        }
      } else {
        const newHeaderTranslateY = currentScrollY - scrollThreshold * 2;

        if (newHeaderTranslateY > headerTranslateY) {
          setHeaderTranslateY(newHeaderTranslateY);
        } else if (currentScrollY - scrollThreshold < headerTranslateY) {
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
    '--header-height': `-${scrollThreshold}px`,
    '--header-translate-y': `${headerTranslateY}px`,
    '--avatar-scale': avatarScale,
  } as CSSProperties;

  return (
    <Container
      as="header"
      className={cn(
        'sticky top-[var(--header-height)] z-10',
        !headerFixed && 'top-auto translate-y-[var(--header-translate-y)]',
        willChange && 'will-change-[top]'
      )}
      style={headerStyles}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between py-7 before:w-11 before:content-['']">
        {children}
      </div>
      {avatar}
    </Container>
  );
}

type AvatarProps = {
  src: string;
  alt: string;
};

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div className="py-7">
      <Link href="/" className="relative z-10">
        <Image
          className="inline-block origin-bottom-left scale-[var(--avatar-scale)] rounded-full border-2 border-transparent"
          width={44}
          height={44}
          src={src}
          alt={alt}
          priority
        />
      </Link>
    </div>
  );
};

export default Header;
