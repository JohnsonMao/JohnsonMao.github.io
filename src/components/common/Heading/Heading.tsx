import type { HTMLAttributes } from 'react';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & HTMLAttributes<HTMLHeadingElement>;

function Heading({ as = 'h2', ...attributes }: HeadingProps) {
  const HeadingTag = as;

  return <HeadingTag {...attributes} />;
}

export default Heading;
