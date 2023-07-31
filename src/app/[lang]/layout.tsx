import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, getDictionary, locales } from '~/i18n';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export type RootParams = {
  params: Partial<{ lang: Locale }>;
};

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  if (!lang) notFound();

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

function RootLayout({ children }: React.PropsWithChildren) {
  return children;
}

export default RootLayout;
