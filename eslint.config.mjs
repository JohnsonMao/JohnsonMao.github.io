import antfu from '@antfu/eslint-config'

export default antfu({
  astro: true,
  typescript: true,
  ignores: [
    '.agent',
    '.agents',
    '.astro',
    '.cursor',
    '.gemini',
    'openspec',
    'dist',
    'node_modules',
    'public',
  ],
})
