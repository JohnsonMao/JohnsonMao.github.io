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
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.root-background': {
          '--base-color': theme('colors.zinc.100'),
          '--line-color': 'rgba(0, 0, 0, 0.04)',
          background: `
            linear-gradient(
              to left,
              var(--line-color) 0,
              var(--line-color) 10%,
              transparent 10%,
              transparent 100%
            ),
            linear-gradient(
              to top,
              var(--line-color) 0,
              var(--line-color) 10%,
              transparent 10%,
              transparent 100%
            ),
            var(--base-color);`,
          backgroundSize: '10px 10px;'
        },
        '.dark .root-background': {
          '--base-color': theme('colors.zinc.900'),
          '--line-color': 'rgba(255, 255, 255, 0.04)',
        }
      })
    })
  ],
};

module.exports = tailwindcssConfig;
