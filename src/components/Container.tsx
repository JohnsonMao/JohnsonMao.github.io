import type { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

type ContainerProps = {
  as?: 'main' | 'header' | 'footer' | 'div';
} & HTMLAttributes<HTMLElement>;

function Container({ as = 'div', className, ...props }: ContainerProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        'mx-4 max-w-6xl px-7 sm:mx-8 md:mx-12 lg:mx-14 lg:px-14 xl:mx-auto',
        className
      )}
      {...props}
    />
  );
}

export default Container;
