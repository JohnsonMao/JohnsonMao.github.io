/** @type {import('postcss-load-config').Config} */
const postcssConfig = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

module.exports = postcssConfig;
