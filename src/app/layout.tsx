import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { getDictionary } from '~/i18n';
import Navbar from '@/components/layouts/Navbar';
import config from '@/configs';
import getLocale from '@/utils/getLocale';
import '@/assets/css/globals.css';

import Html from './Html';
import Providers from './providers';

const { navbar } = config;

export async function generateMetadata(): Promise<Metadata> {
  const acceptLanguage = headers().get('Accept-Language');
  const lang = getLocale(acceptLanguage);
  const dict = await getDictionary(lang);

  return {
    title: {
      template: `%s | ${dict.title}`,
      default: dict.title,
    },
    authors: [
      {
        name: dict.author,
        url: dict.github,
      },
    ],
  };
}

async function HtmlLayout({ children }: React.PropsWithChildren) {
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

export default HtmlLayout;
