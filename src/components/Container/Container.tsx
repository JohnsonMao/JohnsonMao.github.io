import { HTMLAttributes, forwardRef } from 'react';
import cn from '@/utils/cn';

type ContainerProps = {
  as?: 'main' | 'header' | 'footer' | 'div';
} & HTMLAttributes<HTMLElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function InternalContainer({ as = 'div', className, ...props }, ref) {
    const Component = as;

    return (
      <Component className={cn('mx-auto', className)} ref={ref} {...props} />
    );
  }
);

export default Container;
