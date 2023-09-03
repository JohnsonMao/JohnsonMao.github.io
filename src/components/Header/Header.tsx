import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from '../Link';
import Image from '../Image';
import ThemeSwitcher from '../ThemeSwitcher';

type MenuItem = {
  text: string;
  href: LinkWithoutLocalePathProps['href'];
};

export type HeaderProps = {
  logoUrl: string | StaticImport;
  logoAlt: string;
  menu: MenuItem[];
};

function Header({ logoUrl, logoAlt, menu }: HeaderProps) {
  return (
    <nav className="sticky top-0 z-10 p-4 drop-shadow-xl">
      <div className="prose prose-xl mx-auto flex justify-between">
        <Link href="/">
          <Image
            className="m-0 rounded-full border-4 border-black shadow-black drop-shadow-xl dark:border-slate-500"
            width={50}
            height={50}
            src={logoUrl}
            alt={logoAlt}
            priority
          />
        </Link>
        <div className="flex items-center gap-4">
          {menu.map(({ text, href }) => (
            <Link
              key={text}
              href={href}
              className="text-white/90 no-underline hover:text-white"
            >
              {text}
            </Link>
          ))}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Header;
