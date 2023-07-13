import type { AnchorHTMLAttributes, ReactNode } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

import cn from '@/utils/cn';

type AnchorProps = AnchorHTMLAttributes<HTMLElement>;

type LinkProps = (NextLinkProps | AnchorProps) & {
  children?: ReactNode;
  className?: string;
};

function Link({ href, className, children, ...attributes }: LinkProps) {
  const isAnchorLink = typeof href === 'string' && href.startsWith('#');
  const isInteralLink =
    typeof href === 'object' || (href && href.startsWith('/'));

  if (isInteralLink) {
    return (
      <NextLink href={href} className={className} {...attributes}>
        {children}
      </NextLink>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} className={className} {...attributes}>
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
      {...attributes}
    >
      {children}
      <HiExternalLink />
    </a>
  );
}

export default Link;
