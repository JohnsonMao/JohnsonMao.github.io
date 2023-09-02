'use client';

import { useTheme } from 'next-themes';

import { BsSunFill, BsMoonFill } from 'react-icons/bs';

function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const handleClick = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <button onClick={handleClick} className="text-white">
      {isDarkTheme ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
}

export default ThemeSwitcher;
