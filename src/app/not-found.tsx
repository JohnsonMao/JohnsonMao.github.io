import type { Metadata } from 'next';
import NotFound from '@/components/NotFound';

export const metadata: Metadata = {
  title: 'Page not found',
};

async function NotFoundPage() {
  return <NotFound />;
}

export default NotFoundPage;
