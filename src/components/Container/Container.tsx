import type { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

type ContainerProps = {
  as?: 'main' | 'header' | 'footer' | 'div';
} & HTMLAttributes<HTMLElement>;

function Container({ as = 'div', className, ...props }: ContainerProps) {
  const Component = as;
  const componentClassName = cn('', className);

  return <Component className={componentClassName} {...props} />;
}

export default Container;
