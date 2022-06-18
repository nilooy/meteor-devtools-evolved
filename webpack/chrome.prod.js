const base = require('./base')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = base('chrome', {
  mode: 'production',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})
