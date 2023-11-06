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
        'px-7 mx-2 md:mx-8 lg:mx-16 lg:px-14',
        className
      )}
      {...props}
    />
  );
}

export default Container;
