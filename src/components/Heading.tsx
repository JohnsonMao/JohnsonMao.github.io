import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

function Heading(props: HeadingProps) {
  return <h2 {...props} />;
}

export default Heading;
