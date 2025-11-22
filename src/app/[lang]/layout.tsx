import type { Metadata } from 'next';
import { WEBSITE_CONFIGS } from '#/constants';
import { getDictionary, locales } from '#/data/i18n';
import { createMetadata } from '#/data/metadata';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Footer from './Footer';
import Header, { Avatar } from './Header';
import Menu, { MenuProps } from './Menu';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const { alternates } = await createMetadata(lang);
  const { common } = await getDictionary(lang);
  const { title } = common;

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

async function I18nLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const { common } = await getDictionary(lang);
  const avatar = {
    src: WEBSITE_CONFIGS.avatarUrl,
    alt: WEBSITE_CONFIGS.authorName,
  };
  const menu: MenuProps['menu'] = [
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
      <Header avatar={<Avatar src={avatar.src} alt={avatar.alt} />}>
        <Menu menu={menu} />
        <ThemeSwitcher />
      </Header>
      {children}
      <Footer copyright={WEBSITE_CONFIGS.copyright} />
    </>
  );
}

export default I18nLayout;
