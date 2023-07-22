'use client';

import { useTheme } from 'next-themes';

import { BsSunFill, BsMoonFill } from 'react-icons/bs';

function ThemeSwitch() {
  const { theme, systemTheme, setTheme } = useTheme();
  const isSystemDarkTheme = systemTheme === 'dark';
  const alternateTheme = isSystemDarkTheme ? 'light' : 'dark';
  const isAlternateTheme = theme === alternateTheme;

  const handleClick = () => {
    setTheme(isAlternateTheme ? 'system' : alternateTheme);
  };

  return (
    <button onClick={handleClick} className="text-white">
      {isAlternateTheme ? <BsMoonFill /> : <BsSunFill />}
    </button>
  );
}

export default ThemeSwitch;
