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
          'px-7 md:mx-8 lg:mx-16 lg:px-14',
          as === 'main' && 'border-2 rounded-lg mt-4 border-gray-500 backdrop-blur',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Container;
