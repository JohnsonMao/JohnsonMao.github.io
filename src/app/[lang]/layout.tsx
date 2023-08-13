import type { Metadata } from 'next';
import { createMetadata } from '~/data/metadata';
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
  const { alternates } = await createMetadata();
  const {
    metadata: { title },
  } = await getDictionary(lang);

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    alternates: {
      ...alternates,
      types: {
        'application/atom+xml': [{ url: `atom.${lang}.xml`, title }],
      },
    },
  };
}

async function I18nLayout({
  children,
  params: { lang },
}: React.PropsWithChildren & RootParams) {
  const { common, metadata } = await getDictionary(lang);
  const menu: MenuItem[] = [
    {
      text: common.posts,
      href: '/',
    },
  ];

  return (
    <>
      <Navbar title={metadata.title} menu={menu} />
      {children}
    </>
  );
}

export default I18nLayout;
