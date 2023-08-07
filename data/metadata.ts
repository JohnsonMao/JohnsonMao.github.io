import type { Metadata } from 'next';

const baseMetadata: Metadata = {
  metadataBase: new URL('https://mao-note.vercel.app'),
  applicationName: "Mao's Notes",
  keywords: ['frontend', 'web', 'notes'],
  referrer: 'origin',
  themeColor: '#000000',
  robots: 'index, follow',
  authors: [
    {
      name: 'Johnson Mao',
      url: 'https://github.com/JohnsonMao',
    },
  ],
  alternates: {
    canonical: '/',
    languages: {
      'zh-TW': '/zh-TW',
      en: '/en',
    },
  },
  // icons: [],
  // manifest: '',
  // openGraph: {},
  // appleWebApp: {},
  // category: '',
};

export default baseMetadata;
