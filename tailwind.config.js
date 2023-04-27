/** @type {import('tailwindcss').Config} */
const tailwindcssConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = tailwindcssConfig;
