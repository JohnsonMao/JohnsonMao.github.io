import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDictionary } from '~/i18n';
import getLocale from '@/utils/getLocale';

export async function generateMetadata(): Promise<Metadata> {
  const acceptLanguage = headers().get('Accept-Language');
  const lang = getLocale(acceptLanguage);
  const dict = await getDictionary(lang);

  return {
    title: dict.notFound.message,
  };
}

async function NotFound() {
  const acceptLanguage = headers().get('Accept-Language');
  const lang = getLocale(acceptLanguage);
  const dict = await getDictionary(lang);

  return <div>{dict.notFound.message}</div>;
}

export default NotFound;
