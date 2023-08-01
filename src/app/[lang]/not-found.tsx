import type { Metadata } from 'next';
import { getDictionary } from '~/i18n';
import NotFound from '@/components/NotFound';
import type { RootParams } from './layout';

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  const dict = await getDictionary(lang || 'en');

  return {
    title: dict.notFound.message,
  };
}

async function NotFoundPage() {
  return <NotFound />;
}

export default NotFoundPage;
