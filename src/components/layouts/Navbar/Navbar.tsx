import Link from 'next/link';

import type { INavbar } from '@/configs';

import ThemeSwitch from '../../common/ThemeSwitch';

export type NavbarProps = INavbar;

function Navbar({ title, menu }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-10 bg-slate-600 p-4 drop-shadow-xl">
      <div className="prose prose-xl mx-auto flex justify-between">
        <Link href="/" className="text-white/90 no-underline hover:text-white">
          {title}
        </Link>
        <div className="flex gap-4">
          {menu.map((navbarLink) => (
            <Link
              key={navbarLink.title}
              href={navbarLink.url}
              className="text-white/90 no-underline hover:text-white"
            >
              {navbarLink.title}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
