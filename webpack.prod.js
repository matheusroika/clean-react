const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
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
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './template.dev.html' }),
    new MiniCssExtractPlugin({ filename: 'main-bundle-[fullhash].css' })
  ]
})
