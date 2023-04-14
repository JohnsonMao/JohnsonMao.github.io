'use client';

import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();

	return (
		<select
			value={theme}
			onChange={(e) => setTheme(e.target.value)}
			className="dark:text-white"
		>
			<option value="system">System</option>
			<option value="dark">Dark</option>
			<option value="light">Light</option>
		</select>
	);
};

export default ThemeSwitch;
