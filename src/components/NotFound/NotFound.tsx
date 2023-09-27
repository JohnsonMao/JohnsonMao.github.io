'use client';

import { Dictionary, getDictionary } from '~/i18n';
import useI18n from '@/hooks/useI18n';
import { H1 } from '../Heading';
import { useEffect, useState } from 'react';

function NotFound() {
  const { lang } = useI18n();
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(lang).then(setDictionary);
  }, [lang]);

  if (!dictionary) return null;

  return (
    <div className="flex h-screen items-center justify-center">
      <H1>{dictionary.notFound.message}</H1>
    </div>
  );
}

export default NotFound;
