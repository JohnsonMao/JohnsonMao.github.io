'use client';

import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

function ThemeSwitch() {
	const { theme, systemTheme, setTheme } = useTheme();
	const isSystemDarkTheme = systemTheme === 'dark';
	const alternateColor = isSystemDarkTheme ? 'light' : 'dark';
	const isAlternateColor = theme === alternateColor;

	const handleClick = () => {
		setTheme(isAlternateColor ? 'system' : alternateColor);
	};

	return (
		<button onClick={handleClick} className="text-white">
			{isAlternateColor ? <BsMoonFill /> : <BsSunFill />}
		</button>
	);
}

export default ThemeSwitch;
