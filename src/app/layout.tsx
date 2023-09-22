import type { Metadata } from 'next';

import { locales } from '~/i18n';
import { createMetadata, createFeedOptions } from '~/data/metadata';
import generateRSS from '@/utils/generateRSS';
import '@/assets/css/globals.css';

import Html from './Html';
import Providers from './Providers';

export async function generateMetadata(): Promise<Metadata> {
  const allFeedOptions = await Promise.all(locales.map(createFeedOptions));

  allFeedOptions.forEach(generateRSS);

  return createMetadata();
}

function HtmlLayout({ children }: React.PropsWithChildren) {
  return (
    <Html>
      <body className="dark:bg-slate-800">
        <Providers>{children}</Providers>
      </body>
    </Html>
  );
}

export default HtmlLayout;
