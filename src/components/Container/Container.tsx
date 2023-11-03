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
        'px-7 md:mx-8 lg:mx-16 lg:px-14',
        as === 'main' &&
          'mt-4 rounded-lg border-2 border-zinc-500 bg-zinc-100/70 dark:bg-zinc-900/70',
        className
      )}
      {...props}
    />
  );
}

export default Container;
