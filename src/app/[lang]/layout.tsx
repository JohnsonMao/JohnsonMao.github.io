import type { Metadata } from 'next';
import { baseMetadata } from '~/data/metadata';
import { Locale, getDictionary, locales } from '~/i18n';
import Navbar, { MenuItem } from '@/components/Navbar';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export type RootParams = {
  params: { lang: Locale };
};

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    alternates: {
      ...baseMetadata.alternates,
      types: {
        'application/rss+xml': [{ url: 'rss.xml', title }],
        'application/atom+xml': [{ url: 'atom.xml', title }],
      },
    },
  };
}

function I18nLayout({ children }: React.PropsWithChildren) {
  const menu: MenuItem[] = [
    {
      text: '文章',
      href: '/',
    },
  ];

  return (
    <>
      <Navbar title={"Mao's Notes"} menu={menu} />
      {children}
    </>
  );
}

export default I18nLayout;
