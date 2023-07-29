import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '此頁面不存在',
};

function NotFound() {
  return <div>此頁面不存在</div>;
}

export default NotFound;
