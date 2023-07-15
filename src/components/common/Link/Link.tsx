import type { ReactNode } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

import cn from '@/utils/cn';

type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
};

function Link({ href, className, children, ...otherProps }: LinkProps) {
  const isInteralLink = typeof href === 'object' || href.startsWith('/');
  const isAnchorLink = typeof href === 'string' && href.startsWith('#');

  if (isInteralLink) {
    return (
      <NextLink href={href} className={className} {...otherProps}>
        {children}
      </NextLink>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} className={className} {...otherProps}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-flex align-top', className)}
      {...otherProps}
    >
      {children}
      <HiExternalLink />
    </a>
  );
}

export default Link;
