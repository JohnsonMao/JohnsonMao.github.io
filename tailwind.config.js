const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
const tailwindcssConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { ...colors.violet, DEFAULT: colors.violet[500] },
      },
      cursor: {
        auto: 'var(--cursor-auto)',
        crosshair: 'var(--cursor-crosshair)',
        pointer: 'var(--cursor-pointer)',
        grab: 'var(--cursor-grab)',
        grabbing: 'var(--cursor-grabbing)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary.700'),
              },
              '.dark &:hover': {
                color: theme('colors.primary.300'),
              },
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
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addBase, addComponents, addUtilities, theme }) => {
      addBase({
        a: {
          cursor: theme('cursor.pointer'),
        },
      });
      addComponents({
        '.lattice': {
          '--lattice-base-color': theme('colors.stone.50'),
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
          '--lattice-base-color': theme('colors.stone.950'),
          '--lattice-line-color': 'rgba(255, 255, 255, 0.04)',
        },
      });
      addComponents({
        '.neon-box': {
          '--neon-color': '35, 35, 35',
          background: `
            linear-gradient(
              to top,
              rgba(var(--neon-color), .1) 0,
              transparent 30%,
              transparent 100%
            )`,
          boxShadow: `
            0 0 1px rgba(var(--neon-color), .8),
            0 1px 3px rgba(var(--neon-color), .2)`,
        },
        '.dark .neon-box': {
          '--neon-color': '220, 220, 220',
        },
        '.neon-text': {
          '--neon-color': theme('colors.primary.400'),
          textShadow: '0 0 .125em var(--neon-color)',
        },
        '.dark .neon-text': {
          '--neon-color': theme('colors.primary.600'),
        },
      });
      addUtilities({
        '.multiline-ellipsis': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': 'var(--webkit-line-clamp, 2)',
          overflow: 'hidden',
        }
      });
      [3, 4, 5].forEach(number => {
        addUtilities({
          [`.multiline-ellipsis-${number}`]: {
            '--webkit-line-clamp': String(number),
          }
        });
      })
    }),
  ],
};

module.exports = tailwindcssConfig;
