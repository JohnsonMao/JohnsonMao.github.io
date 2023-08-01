import type { Metadata } from 'next';

import en from '~/i18n/locales/en';
import Navbar from '@/components/Navbar';
import config from '@/configs';
import '@/assets/css/globals.css';

import Html from './Html';
import Providers from './Providers';

const { navbar } = config;

export const metadata: Metadata = {
  title: {
    template: `%s | ${en.title}`,
    default: en.title,
  },
  authors: [
    {
      name: en.author,
      url: en.github,
    },
  ],
};

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
