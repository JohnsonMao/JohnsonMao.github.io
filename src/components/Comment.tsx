'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { GISCUS_CONFIGS } from '~/constants';

function Comment() {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const giscusTheme = isDarkTheme ? 'noborder_dark' : 'noborder_light';

  return <Giscus {...GISCUS_CONFIGS} theme={giscusTheme} />;
}

export default Comment;
