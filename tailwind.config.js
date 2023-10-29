const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

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
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.body-bg': {
          '--color': 'rgba(0, 0, 0, 0.1)',
          background: `
            linear-gradient(
              to left,
              var(--color) 0,
              var(--color) 1px,
              transparent 1px,
              transparent 10px
            ),
            linear-gradient(
              to top,
              var(--color) 0,
              var(--color) 1px,
              transparent 1px,
              transparent 10px
            );`,
          backgroundSize: '10px 10px;'
        },
        '.body-bg-dark': {
          '--color': 'rgba(255, 255, 255, 0.05)',
        }
      })
    })
  ],
};

module.exports = tailwindcssConfig;
