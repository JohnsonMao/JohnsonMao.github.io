'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { defaultLocale } from '~/i18n';

function Html({ children }: React.PropsWithChildren) {
  const selectLayoutSegment = useSelectedLayoutSegment();
  const lang = selectLayoutSegment || defaultLocale;

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      {children}
    </html>
  );
}

export default Html;
