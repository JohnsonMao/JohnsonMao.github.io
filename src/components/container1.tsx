import { forwardRef, type HTMLAttributes, Ref } from 'react';
import cn from '@/utils/cn';

type ContainerProps = {
  as?: 'main' | 'header' | 'footer' | 'div';
} & HTMLAttributes<HTMLDivElement>;

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ as = 'div', className, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as Ref<HTMLDivElement>}
        className={cn(
          'mx-4 max-w-6xl px-7 sm:mx-8 md:mx-12 lg:mx-14 lg:px-14 xl:mx-auto',
          className
        )}
        {...props}
      />
    );
  }
);

export default Container;
