import type { Metadata } from 'next';
import { avatarUrl, name, copyright, createMetadata } from '~/data/metadata';
import { Locale, getDictionary, locales } from '~/i18n';
import Header, { HeaderProps } from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export type RootParams = {
  params: { lang: Locale };
};

export async function generateMetadata({
  params: { lang },
}: RootParams): Promise<Metadata> {
  const { alternates } = await createMetadata(lang);
  const { metadata } = await getDictionary(lang);
  const { title } = metadata;

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
  const { common } = await getDictionary(lang);
  const avatar = {
    src: avatarUrl,
    alt: name,
  };
  const menu: HeaderProps['menu'] = [
    {
      text: common.home,
      href: '/',
    },
    {
      text: common.posts,
      href: '/posts',
    },
  ];

  return (
    <>
      <Header avatar={avatar} menu={menu} />
      {children}
      <Footer copyright={copyright} />
    </>
  );
}

export default I18nLayout;
