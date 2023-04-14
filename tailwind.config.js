/** @type {import('tailwindcss').Config} */
const tailwindcssConfig = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
};

module.exports = tailwindcssConfig;
