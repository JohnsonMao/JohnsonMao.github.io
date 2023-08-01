'use client';

import useI18n from '@/hooks/useI18n';

function NotFound() {
  const { dict } = useI18n();

  return <h1>{dict.notFound.message}</h1>;
}

export default NotFound;
