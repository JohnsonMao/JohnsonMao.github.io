'use client';

import { useRef, ReactNode, HTMLAttributes } from 'react';
import { useSpring, animated } from '@react-spring/web';

type CollapseProps = {
  isOpen: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function Collapse({
  isOpen,
  children,
  ...props
}: CollapseProps) {
  const childrenRef = useRef<HTMLDivElement>(null);
  const styles = useSpring({
    to: {
      height: isOpen ? childrenRef.current?.clientHeight : 0,
      opacity: isOpen ? 1 : 0.6,
    },
  });

  return (
    <animated.div className="overflow-hidden" style={styles} {...props}>
      <div ref={childrenRef}>{children}</div>
    </animated.div>
  );
}
