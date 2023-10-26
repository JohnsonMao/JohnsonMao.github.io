const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
const tailwindcssConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { ...colors.lime, DEFAULT: colors.lime[500] },
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
            },
            code: {
              margin: '0 4px',
              padding: '2px 4px',
              borderRadius: '4px',
              background: '#1e1e1e',
              color: '#ff8888',
            },
            li: {
              a: {
                margin: 0,
              },
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
