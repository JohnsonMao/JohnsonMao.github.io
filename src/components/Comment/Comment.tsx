'use client';

import type { HTMLAttributes } from 'react';
import { useTheme } from 'next-themes';
import Giscus from '@giscus/react';
import giscusConfigs from '~/data/giscus';

function Comment(props: HTMLAttributes<HTMLElement>) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const giscusTheme = isDarkTheme ? 'noborder_dark' : 'noborder_light';

  return (
    <div {...props}>
      <Giscus {...giscusConfigs} theme={giscusTheme} />
    </div>
  );
}

export default Comment;
