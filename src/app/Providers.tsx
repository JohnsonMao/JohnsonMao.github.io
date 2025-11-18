'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { ThemeProvider } from 'next-themes';

function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      {children}
      <AppProgressBar
        height="4px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ThemeProvider>
  );
}

export default Providers;
