'use client';

import { useTheme } from 'next-themes';
import Giscus from '@giscus/react';
import giscusConfigs from '~/data/giscus';

function Comment() {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const giscusTheme = isDarkTheme ? 'noborder_dark' : 'noborder_light';

  return <Giscus {...giscusConfigs} theme={giscusTheme} />;
}

export default Comment;
