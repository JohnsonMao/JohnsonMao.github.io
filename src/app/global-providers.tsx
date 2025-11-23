'use client';

import { Inter } from 'next/font/google';
import { Locale, Messages, NextIntlClientProvider } from 'next-intl';
import { AppProgressBar } from 'next-nprogress-bar';
import { ThemeProvider } from 'next-themes';
import './css/globals.css';

const inter = Inter({ subsets: ['latin'] });

interface GlobalProvidersProps extends React.PropsWithChildren {
  locale: Locale;
  messages: Messages;
}

function GlobalProviders({ children, locale, messages }: GlobalProvidersProps) {
  return (
    <html
      lang={locale}
      className={inter.className}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Taipei"
        >
          <ThemeProvider attribute="class">
            {children}
            <AppProgressBar
              height="4px"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default GlobalProviders;
