'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: '此頁面不存在',
};

function NotFound() {
  const pathname = usePathname();
  console.log(pathname);
  return <div>此頁面不存在</div>;
}

export default NotFound;
