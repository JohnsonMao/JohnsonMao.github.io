'use client';

import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import useIsMounted from '@/hooks/useIsMounted';
import Button from './Button';

function ThemeSwitcher() {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const handleClick = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  if (!isMounted) {
    return <div></div>;
  }

  return (
    <Button aria-label="theme switcher" className="p-3" onClick={handleClick}>
      {isDarkTheme ? (
        <BsMoonFill size="1.25rem" />
      ) : (
        <BsSunFill size="1.25rem" />
      )}
    </Button>
  );
}

export default ThemeSwitcher;
