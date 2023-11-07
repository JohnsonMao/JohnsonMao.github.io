'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

type ThemeSwitcher = {
  className?: string;
};

function ThemeSwitcher({ className }: ThemeSwitcher) {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const handleClick = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
