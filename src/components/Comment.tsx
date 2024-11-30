'use client';

import { useTheme } from 'next-themes';
import { GISCUS_CONFIGS } from '~/constants';
import Giscus from '@giscus/react';

function Comment() {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const giscusTheme = isDarkTheme ? 'noborder_dark' : 'noborder_light';

  return <Giscus {...GISCUS_CONFIGS} theme={giscusTheme} />;
}

export default Comment;
