import NextImage, { ImageProps as NextImageProps } from 'next/image';
import cn from '@/utils/cn';

type ImageProps = NextImageProps & { base64?: string };

const IMAGE_BLUR_DATA =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII=';

function Image({
  src,
  height,
  width,
  base64,
  alt,
  className,
  ...otherProps
}: ImageProps) {
  if (!height || !width) {
    return (
      <picture className={cn('not-prose relative block h-96', className)}>
        <NextImage
          src={src}
          alt={alt}
          className="object-cover"
          placeholder="blur"
          blurDataURL={base64 || IMAGE_BLUR_DATA}
          fill
          {...otherProps}
        />
      </picture>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      placeholder="blur"
      blurDataURL={base64 || IMAGE_BLUR_DATA}
      className={className}
      {...otherProps}
    />
  );
}

export default Image;
