import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { WEBSITE_CONFIGS } from '#/constants';
import { createFeedOptions, createMetadata } from '#/data/metadata';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { routing } from '@/i18n/routing';
import generateRSS from '@/utils/generateRSS';
import GlobalProviders from '../global-providers';
import Footer from './Footer';
import Header, { Avatar } from './Header';
import Menu, { MenuProps } from './Menu';

export async function generateStaticParams() {
  const allFeedOptions = await Promise.all(
    routing.locales.map(createFeedOptions)
  );
  allFeedOptions.forEach(generateRSS);
  return routing.locales.map((lang) => ({ lang }));
}

export function generateViewport(): Viewport {
  return {
    themeColor: '#000000',
  };
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  const { alternates } = await createMetadata(lang);
  const messages = await getMessages({ locale: lang });
  const { title } = messages.common;

  return {
    title: {
      template: `%s - ${title}`,
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

async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  setRequestLocale(lang);
  const messages = await getMessages({ locale: lang });
  const avatar = {
    src: WEBSITE_CONFIGS.avatarUrl,
    alt: WEBSITE_CONFIGS.authorName,
  };
  const menu: MenuProps['menu'] = [
    {
      text: messages.common.home,
      href: '/',
    },
    {
      text: messages.common.posts,
      href: '/posts',
    },
  ];

  return (
    <GlobalProviders locale={lang} messages={messages}>
      <Header avatar={<Avatar src={avatar.src} alt={avatar.alt} />}>
        <Menu menu={menu} />
        <ThemeSwitcher />
      </Header>
      {children}
      <Footer copyright={WEBSITE_CONFIGS.copyright} />
    </GlobalProviders>
  );
}

export default RootLayout;
