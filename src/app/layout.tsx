import type { Metadata } from 'next';

import baseMetadata from '~/data/metadata';
import '@/assets/css/globals.css';

import Html from './Html';
import Providers from './Providers';

export const metadata: Metadata = baseMetadata;

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
