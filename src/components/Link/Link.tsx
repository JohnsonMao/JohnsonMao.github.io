'use client';

import type { ReactNode } from 'react';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

import cn from '@/utils/cn';
import getLocale from '@/utils/getLocale';

type LinkProps<T extends string = string> = (
  | NextLinkProps<T>
  | LinkWithoutLocalePathProps
  | ExternalLinkProps
) & {
  children: ReactNode;
  className?: string;
};

function Link<T extends string = string>({
  href,
  className,
  children,
  ...otherProps
}: LinkProps<T>) {
  const pathname = usePathname();

  const isObjectHref = typeof href === 'object' || href.startsWith('#');
  const isAnchorLink = !isObjectHref && href.startsWith('#');
  const isInternalLink = !isObjectHref && href.startsWith('/');

  if (isObjectHref || isAnchorLink) {
    return (
      <NextLink href={href as Route} className={className} {...otherProps}>
        {children}
      </NextLink>
    );
  }

  if (isInternalLink) {
    const rootPath = getLocale(pathname);
    const adjustedHref = rootPath ? `/${rootPath}${href}` : href;

    return (
      <NextLink
        href={adjustedHref as Route}
        className={cn(
          'hover:text-primary-700 dark:hover:text-primary-300',
          className
        )}
        {...otherProps}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex hover:text-primary-700 dark:hover:text-primary-300',
        className
      )}
      {...otherProps}
    >
      {children}
      <HiExternalLink />
    </a>
  );
}

export default Link;
