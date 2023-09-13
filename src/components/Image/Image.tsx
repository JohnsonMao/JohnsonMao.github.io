'use client';

import { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import cn from '@/utils/cn';

type ImageProps = NextImageProps & { base64?: string };

function Image({
  src,
  height,
  width,
  base64,
  alt,
  className,
  onLoadingComplete,
  ...otherProps
}: ImageProps) {
  const [loading, setLoading] = useState(true);
  const handleComplete = (img: HTMLImageElement) => {
    setLoading(false);
    onLoadingComplete?.(img);
  };

  if (!height || !width) {
    return (
      <picture className={cn('not-prose relative block h-96', className)}>
        <NextImage
          src={src}
          alt={alt}
          className="object-contain"
          sizes="100vw"
          fill
          onLoadingComplete={handleComplete}
          {...otherProps}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="h-10 w-10 animate-spin rounded-full border-8 border-white/80 border-t-white/20"></div>
          </div>
        )}
      </picture>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      sizes="100vw"
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      className={className}
      onLoadingComplete={handleComplete}
      {...otherProps}
    />
  );
}

export default Image;
