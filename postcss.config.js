module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-units': { size: 16 },
    'postcss-hexrgba': {},
    'postcss-preset-env': {
      stage: 0,
    },
    cssnano: {
      preset: 'default',
      zindex: false
    },
  },
});
