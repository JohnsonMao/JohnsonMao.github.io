import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from '../Image';

export type LogoProps = {
  src: string | StaticImport;
  alt: string;
};

function Logo({ src, alt }: LogoProps) {
  return (
    <Image
      className="rounded-full border-4 border-black shadow-black drop-shadow-xl dark:border-slate-500"
      width={50}
      height={50}
      src={src}
      alt={alt}
      priority
    />
  );
}

export default Logo;
