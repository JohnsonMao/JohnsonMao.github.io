'use client';

import useI18n from '@/hooks/useI18n';

function Html({ children }: React.PropsWithChildren) {
  const { lang } = useI18n();

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      {children}
    </html>
  );
}

export default Html;
