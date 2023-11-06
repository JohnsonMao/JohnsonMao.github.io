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
        '.lattice': {
          '--lattice-base-color': theme('colors.stone.100'),
          '--lattice-line-color': 'rgba(0, 0, 0, 0.04)',
          '--lattice-ratio': '10%',
          '--lattice-size': '10px 10px',
          background: `
            linear-gradient(
              to left,
              var(--lattice-line-color) 0,
              var(--lattice-line-color) var(--lattice-ratio),
              transparent var(--lattice-ratio),
              transparent 100%
            ),
            linear-gradient(
              to top,
              var(--lattice-line-color) 0,
              var(--lattice-line-color) var(--lattice-ratio),
              transparent var(--lattice-ratio),
              transparent 100%
            ),
            var(--lattice-base-color);`,
          backgroundSize: 'var(--lattice-size);',
        },
        '.dark .lattice': {
          '--lattice-base-color': theme('colors.stone.900'),
          '--lattice-line-color': 'rgba(255, 255, 255, 0.04)',
        },
      });
      addComponents({
        '.fluorescent-box': {
          '--fluorescent-color': '35, 35, 35',
          background: `
            linear-gradient(
              to top,
              rgba(var(--fluorescent-color), .1) 0,
              transparent 50%,
              transparent 100%
            )`,
          boxShadow: `
            0 0 1px rgba(var(--fluorescent-color), .8),
            0 1px 3px rgba(var(--fluorescent-color), .2)`,
        },
        '.dark .fluorescent-box': {
          '--fluorescent-color': '220, 220, 220',
        },
        '.fluorescent-text': {
          '--fluorescent-color': theme('colors.primary.300'),
          textShadow: '0 0 .25em var(--fluorescent-color)',
        },
        '.dark .fluorescent-text': {
          '--fluorescent-color': theme('colors.primary.700'),
        },
      });
    }),
  ],
};

module.exports = tailwindcssConfig;
