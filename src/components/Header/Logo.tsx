import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { CSSProperties } from 'react';
import { clamp } from '@/utils/math';
import Image from '../Image';
import Link from '../Link';

export type LogoProps = {
  src: string | StaticImport;
  alt: string;
  scrollY: number;
  scrollThreshold: number;
};

function Logo({ src, alt, scrollY, scrollThreshold }: LogoProps) {
  const translateY = clamp(scrollY * -1, scrollThreshold * -1) + scrollThreshold;
  const scale = 1.5 - clamp(scrollY, scrollThreshold) / (scrollThreshold * 2);
  const style = {
    '--tw-translate-y': `${translateY}px`,
    '--tw-scale-x': scale,
    '--tw-scale-y': scale,
  } as CSSProperties;

  return (
    <Link
      href="/"
      className="origin-top-left translate-y-0 scale-100"
      style={style}
    >
      <Image
        className="rounded-full shadow-black drop-shadow-xl"
        width={40}
        height={40}
        src={src}
        alt={alt}
        priority
      />
    </Link>
  );
}

export default Logo;
