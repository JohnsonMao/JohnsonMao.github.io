import type { Metadata } from 'next';

import Navbar from '@/components/layouts/Navbar';
import config from '@/configs';
import { Locale, locales } from '@/i18n';

import Providers from './providers';

import '@/assets/css/globals.css';

const { meta, navbar } = config;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  authors: meta.authors,
};

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export type RootProps = {
  params: { lang: Locale };
};

function RootLayout({
  children,
  params: { lang },
}: React.PropsWithChildren & RootProps) {
  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
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
