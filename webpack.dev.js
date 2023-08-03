const path = require('path')
const webpackMerge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = webpackMerge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        { loader: 'sass-loader' }
      ]
    }]
  },
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    historyApiFallback: true,
    devMiddleware: { writeToDisk: true }
  }
})
