import type { Metadata } from 'next';

import { locales } from '~/i18n';
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
        <div className="lattice fixed inset-x-0 top-0 -z-50 h-screen transition-colors">
          <Container className="h-screen border-x-2 border-zinc-500/5 bg-zinc-100/70 transition-colors dark:bg-zinc-900/70" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </Html>
  );
}

export default HtmlLayout;
