'use client';

import { ThemeProvider } from 'next-themes';
import { AppProgressBar } from 'next-nprogress-bar';

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
