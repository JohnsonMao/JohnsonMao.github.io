import type { Metadata } from 'next';
import { H2 } from '@/components/Heading';

export const metadata: Metadata = {
  title: 'Page not found',
};

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <H2>Page not found</H2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFoundPage;
