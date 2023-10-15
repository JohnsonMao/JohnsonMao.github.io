import { HTMLAttributes, forwardRef } from 'react';
import cn from '@/utils/cn';

type ContainerProps = {
  as?: 'main' | 'header' | 'footer' | 'div';
} & HTMLAttributes<HTMLElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function InternalContainer({ as = 'div', className, ...props }, ref) {
    const Component = as;

    return (
      <Component
        className={cn(
          'border-x border-red-50 px-7 md:mx-8 lg:mx-16 lg:px-14',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Container;
