import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '此頁面不存在456',
};

function NotFound() {
  return <div>此頁面不存在456</div>;
}

export default NotFound;
