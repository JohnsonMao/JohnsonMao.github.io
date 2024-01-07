import type { Metadata } from 'next';

import { locales } from '~/data/i18n';
import { createMetadata, createFeedOptions } from '~/data/metadata';
import Container from '@/components/Container';
import generateRSS from '@/utils/generateRSS';

import Html from './Html';
import Providers from './Providers';
import './css/globals.css';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const allFeedOptions = await Promise.all(locales.map(createFeedOptions));

  allFeedOptions.forEach(generateRSS);

  return createMetadata();
}

function HtmlLayout({ children }: React.PropsWithChildren) {
  return (
    <Html>
      <body>
        <div className="bg-lattice fixed inset-x-0 top-0 -z-50 h-screen">
          <Container className="h-screen bg-zinc-50/70 shadow shadow-zinc-500/50 dark:bg-zinc-950/70" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </Html>
  );
}

export default HtmlLayout;
