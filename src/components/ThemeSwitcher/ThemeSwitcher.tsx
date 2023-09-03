'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const handleClick = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div></div>;

  return (
    <button onClick={handleClick} className="text-white">
      {isDarkTheme ? <BsSunFill key="1" /> : <BsMoonFill key="2" />}
    </button>
  );
}

export default ThemeSwitcher;
