/** @type {import('tailwindcss').Config} */
const tailwindcssConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              margin: '0 4px',
              padding: '2px 4px',
              borderRadius: '4px',
              background: '#1e1e1e',
              color: '#ff8888',
            },
            'code::before': { content: '' },
            'code::after': { content: '' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = tailwindcssConfig;
