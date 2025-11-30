'use client';

import { HiExternalLink } from 'react-icons/hi';
import { Link as NextLink } from '@/i18n/navigation';
import cn from '@/utils/cn';

export type LinkProps = React.ComponentProps<typeof NextLink>;

function Link({ href, className, children, ...otherProps }: LinkProps) {
  const isExternalLink =
    typeof href === 'string' &&
    !href.startsWith('/') &&
    !href.startsWith('#') &&
    !href.startsWith('?');

  return (
    <NextLink
      href={href}
      className={cn(isExternalLink && 'inline-flex', className)}
      {...otherProps}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
    >
      {children}
      {isExternalLink && <HiExternalLink />}
    </NextLink>
  );
}

export default Link;
