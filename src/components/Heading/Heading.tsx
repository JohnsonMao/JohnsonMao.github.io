import type { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

type HTMLHeadingProps = HTMLAttributes<HTMLHeadingElement>;

type HeadingProps = {
  Component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & HTMLHeadingProps;

function Heading({
  Component = 'h2',
  id,
  className,
  children,
  ...otherProps
}: HeadingProps) {
  return (
    <Component
      id={id}
      className={cn('group relative', className)}
      {...otherProps}
    >
      <a
        href={id}
        className="absolute -left-6 no-underline opacity-0 group-hover:opacity-100"
      >
        #
      </a>
      {children}
    </Component>
  );
}

export const H1 = (props: HTMLHeadingProps) => (
  <Heading Component="h1" {...props} />
);
export const H2 = (props: HTMLHeadingProps) => (
  <Heading Component="h2" {...props} />
);
export const H3 = (props: HTMLHeadingProps) => (
  <Heading Component="h3" {...props} />
);
export const H4 = (props: HTMLHeadingProps) => (
  <Heading Component="h4" {...props} />
);
export const H5 = (props: HTMLHeadingProps) => (
  <Heading Component="h5" {...props} />
);
export const H6 = (props: HTMLHeadingProps) => (
  <Heading Component="h6" {...props} />
);

export default Heading;
