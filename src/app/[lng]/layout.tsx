import type { Metadata } from 'next';

import Navbar from '@/components/layouts/Navbar';
import config from '@/configs';

import type { RootProps } from './page';
import Providers from './providers';

import '@/assets/css/globals.css';

const { meta, navbar } = config;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  authors: meta.authors,
};

function RootLayout({ children, params }: React.PropsWithChildren & RootProps) {
  return (
    <html lang={params.lng} className="scroll-smooth" suppressHydrationWarning>
      <body className="dark:bg-slate-800">
        <Providers>
          <Navbar {...navbar} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
