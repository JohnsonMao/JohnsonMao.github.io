import type { Metadata } from 'next';
import { avatarUrl, name, copyright, createMetadata } from '~/data/metadata';
import { Locale, getDictionary, locales } from '~/data/i18n';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Header, { Avatar } from './Header';
import Footer from './Footer';
import Menu, { MenuProps } from './Menu';
import cn from '@/utils/cn';

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

async function I18nLayout({
  children,
  params: { lang },
}: RootParams & React.PropsWithChildren) {
  const { common } = await getDictionary(lang);
  const avatar = {
    src: avatarUrl,
    alt: name,
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
        <ThemeSwitcher
          className={cn(
            'neon-box rounded-full p-3 backdrop-blur-sm',
            'bg-zinc-100/80 dark:bg-zinc-900/80'
          )}
        />
      </Header>
      {children}
      <Footer copyright={copyright} />
    </>
  );
}

export default I18nLayout;
