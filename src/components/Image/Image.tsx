import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = NextImageProps & { base64?: string };

function Image({ src, height, width, base64, alt, ...otherProps }: ImageProps) {
  if (!height || !width) {
    return (
      <picture className="relative block h-96">
        <NextImage
          src={src}
          alt={alt}
          className="m-0 object-contain"
          sizes="(min-width: 40em) 40em, 100vw"
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
      sizes="(min-width: 40em) 40em, 100vw"
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
    />
  );
}

export default Image;
