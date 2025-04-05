'use client';

import type { AriaAttributes, ButtonHTMLAttributes } from 'react';
import cn from '@/utils/cn';
import Link, { LinkProps } from './Link';

type BaseButtonProps = {
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = BaseButtonProps | LinkProps;

function Button({
  children,
  className,
  ...props
}: ButtonProps & AriaAttributes) {
  const buttonOrLinkClassName = cn(
    'neon-box rounded-full px-5 py-1.5 backdrop-blur-sm',
    'bg-zinc-100/80 dark:bg-zinc-900/80',
    className
  );

  if (props.href) {
    return (
      <Link className={buttonOrLinkClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonOrLinkClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
