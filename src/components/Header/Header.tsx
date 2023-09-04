'use client';

import { useEffect, useState, useRef } from 'react';
import cn from '@/utils/cn';
import ThemeSwitcher from '../ThemeSwitcher';
import Link from '../Link';
import Logo, { LogoProps } from './Logo';

type MenuItem = {
  text: string;
  href: LinkWithoutLocalePathProps['href'];
};

export type HeaderProps = {
  logo: LogoProps;
  menu: MenuItem[];
};

function Header({ logo, menu }: HeaderProps) {
  const beforeScrollY = useRef(0);
  const [hideHeader, setHideHeader] = useState(false);

  const headerClassName = cn(
    'sticky top-0 z-10 flex translate-y-0 items-center justify-between px-4 pt-2 transition-transform',
    hideHeader && '-translate-y-full'
  );

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(beforeScrollY.current - window.scrollY < 0);
      beforeScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={headerClassName}>
      <Link href="/">
        <Logo {...logo} />
      </Link>
      <nav>
        <ul className="flex list-none rounded-full bg-gray-900/60 px-3 backdrop-blur">
          {menu.map(({ text, href }) => (
            <li key={text}>
              <Link
                href={href}
                className="prose prose-xl text-white/90 no-underline hover:text-white"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeSwitcher />
    </header>
  );
}

export default Header;