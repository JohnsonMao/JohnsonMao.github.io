import type { Metadata } from 'next';

import Navbar from '@/components/layouts/Navbar';
import config from '@/configs';
import '@/assets/css/globals.css';

import Html from './Html';
import Providers from './providers';

const { meta, navbar } = config;

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  authors: meta.authors,
};

function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <Html>
      <body className="dark:bg-slate-800">
        <Providers>
          <Navbar {...navbar} />
          {children}
        </Providers>
      </body>
    </Html>
  );
}

export default RootLayout;
