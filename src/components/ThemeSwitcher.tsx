'use client';

import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import useIsMounted from '@/hooks/useIsMounted';

type ThemeSwitcherProps = {
  className?: string;
};

function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const handleClick = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  if (!isMounted) {
    return (
      <div className={className}>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/80 border-t-white/20"></div>
      </div>
    );
  }

  return (
    <button
      aria-label="theme switcher"
      className={className}
      onClick={handleClick}
    >
      {isDarkTheme ? (
        <BsMoonFill size="1.25rem" />
      ) : (
        <BsSunFill size="1.25rem" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
