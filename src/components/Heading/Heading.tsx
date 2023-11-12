import type { HTMLAttributes } from 'react';
import cn from '@/utils/cn';
import Link from '../Link';

type HTMLHeadingProps = HTMLAttributes<HTMLHeadingElement>;

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & HTMLHeadingProps;

function Heading({ as, id, className, children, ...otherProps }: HeadingProps) {
  const Component = as;

  return (
    <Component
      id={id}
      className={cn('group relative', className)}
      {...otherProps}
    >
      {id && (
        <Link
          href={`#${id}`}
          className="absolute right-full pr-2 no-underline opacity-0 group-hover:opacity-100"
        >
          #
        </Link>
      )}
      {children}
    </Component>
  );
}

export const H1 = (props: HTMLHeadingProps) => <Heading as="h1" {...props} />;
export const H2 = (props: HTMLHeadingProps) => <Heading as="h2" {...props} />;
export const H3 = (props: HTMLHeadingProps) => <Heading as="h3" {...props} />;
export const H4 = (props: HTMLHeadingProps) => <Heading as="h4" {...props} />;
export const H5 = (props: HTMLHeadingProps) => <Heading as="h5" {...props} />;
export const H6 = (props: HTMLHeadingProps) => <Heading as="h6" {...props} />;

export default Heading;
