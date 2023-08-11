import type { Metadata } from 'next';

import { baseMetadata, feedOptions } from '~/data/metadata';
import generateRSS from '@/utils/generateRSS';
import '@/assets/css/globals.css';

import Html from './Html';
import Providers from './Providers';

export function generateMetadata(): Metadata {
  generateRSS(feedOptions);

  return baseMetadata;
}

async function HtmlLayout({ children }: React.PropsWithChildren) {
  return (
    <Html>
      <body className="dark:bg-slate-800">
        <Providers>{children}</Providers>
      </body>
    </Html>
  );
}

export default HtmlLayout;
