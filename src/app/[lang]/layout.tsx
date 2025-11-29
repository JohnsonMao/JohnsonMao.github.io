import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { WEBSITE_CONFIGS } from '#/constants';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { routing } from '@/i18n/routing';
import generateRSS, { createFeedOptions } from '@/utils/generateRSS';
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
  const messages = await getMessages({ locale: lang });
  const {
    metadata: { title, description, keywords, applicationName, siteName },
  } = messages;
  const baseUrl = WEBSITE_CONFIGS.domainUrl;
  const ogImage = `${baseUrl}${WEBSITE_CONFIGS.avatarUrl}`;
  const currentUrl = `${baseUrl}/${lang === routing.defaultLocale ? '' : lang}`;

  return {
    title: {
      template: `%s - ${title}`,
      default: title,
    },
    description,
    metadataBase: new URL(baseUrl),
    applicationName,
    keywords,
    authors: [
      {
        name: WEBSITE_CONFIGS.authorName,
        url: WEBSITE_CONFIGS.authorUrl,
      },
    ],
    creator: WEBSITE_CONFIGS.authorName,
    publisher: WEBSITE_CONFIGS.authorName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${baseUrl}/${locale === routing.defaultLocale ? '' : locale}`,
        ])
      ),
      types: {
        'application/atom+xml': [{ url: `atom.${lang}.xml`, title }],
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: currentUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
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
