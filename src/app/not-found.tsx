import type { Metadata } from 'next';
import en from '~/i18n/locales/en';
import NotFound from '@/components/NotFound';

export const metadata: Metadata = {
  title: en.notFound.message,
};

async function NotFoundPage() {
  return <NotFound />;
}

export default NotFoundPage;
