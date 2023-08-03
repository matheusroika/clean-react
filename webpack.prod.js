const webpackMerge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = webpackMerge(common, {
  mode: 'production',
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
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})
