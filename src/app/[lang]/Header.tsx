'use client';

import { CSSProperties, useCallback, useRef, useState } from 'react';
import Container from '@/components/Container';
import Image from '@/components/Image';
import Link from '@/components/Link';
import { useHeaderHeight } from '@/contexts/HeaderHeightContext';
import useIsMounted from '@/hooks/useIsMounted';
import useScroll, { ScrollHandler } from '@/hooks/useScroll';
import cn from '@/utils/cn';
import { toFixedNumber } from '@/utils/math';

type HeaderProps = {
  avatar: React.ReactNode;
} & React.PropsWithChildren;

function Header({ avatar, children }: HeaderProps) {
  const isMounted = useIsMounted();
  const { headerHeight, registerHeader } = useHeaderHeight();
  const [avatarScale, setAvatarScale] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(true);
  const [headerTranslateY, setHeaderTranslateY] = useState(0);
  const [willChange, setWillChange] = useState(true);
  const previousScrollY = useRef(0);

  const handleScrollDown = useCallback(
    (scrollY: number) => {
      if (scrollY < headerHeight) {
        setHeaderFixed(true);
      } else if (headerFixed) {
        setHeaderTranslateY(scrollY - headerHeight);
        setHeaderFixed(false);
      }
    },
    [headerHeight, headerFixed]
  );

  const handleScrollUp = useCallback(
    (scrollY: number, deltaScrollY: number) => {
      const newHeaderTranslateY = scrollY - headerHeight * 2;

      if (deltaScrollY < headerHeight / -4) {
        setHeaderFixed(true);
      } else if (newHeaderTranslateY > headerTranslateY) {
        setHeaderTranslateY(newHeaderTranslateY);
      } else if (scrollY - headerHeight < headerTranslateY) {
        setHeaderFixed(true);
      }
    },
    [headerHeight, headerTranslateY]
  );

  const handleAvatarScale = useCallback(
    (scrollY: number) => {
      setWillChange(scrollY < headerHeight + headerHeight);
      if (scrollY > headerHeight) {
        setAvatarScale(1);
      } else {
        setAvatarScale(toFixedNumber(2)(1.5 - scrollY / (headerHeight * 2)));
      }
    },
    [headerHeight]
  );

  const scrollHandler = useCallback<ScrollHandler>(
    ({ y }) => {
      const currentScrollY = Math.floor(y);
      const deltaScrollY = currentScrollY - previousScrollY.current;
      const isScrollingDown = deltaScrollY > 0;

      previousScrollY.current = currentScrollY;

      if (isScrollingDown) {
        handleScrollDown(currentScrollY);
      } else {
        handleScrollUp(currentScrollY, deltaScrollY);
      }

      handleAvatarScale(currentScrollY);
    },
    [handleScrollDown, handleScrollUp, handleAvatarScale]
  );

  useScroll({ handler: scrollHandler, initial: true });

  const headerStyles = {
    '--scroll-threshold': `-${headerHeight}px`,
    '--header-translate-y': `${headerTranslateY}px`,
    '--avatar-scale': avatarScale,
  } as CSSProperties;

  return (
    <Container
      as="header"
      className={cn(
        'sticky top-auto z-10 translate-y-[var(--header-translate-y)] opacity-0 transition-opacity duration-500 ease-in-out',
        headerFixed && 'top-[var(--scroll-threshold)] translate-y-0',
        isMounted && 'opacity-100'
      )}
      style={headerStyles}
    >
      <div
        ref={registerHeader}
        className="sticky top-0 z-10 flex items-center justify-between py-7 before:w-11 before:content-['']"
      >
        {children}
      </div>
      <div className="py-7">
        <div
          className={cn(
            'relative z-10 inline-block origin-bottom-left scale-[var(--avatar-scale)] rounded-full',
            willChange && 'will-change-transform'
          )}
        >
          {avatar}
        </div>
      </div>
    </Container>
  );
}

type AvatarProps = {
  src: string;
  alt: string;
};

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <Link href="/" className="inline-block rounded-full">
      <Image
        className="inline-block rounded-full border-2 border-transparent"
        width={44}
        height={44}
        src={src}
        alt={alt}
      />
    </Link>
  );
};

export default Header;
