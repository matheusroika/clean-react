const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { ContextReplacementPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const dateFnsLocales = ['pt-BR']

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
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    axios: 'axios',
    validator: 'validator'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'template.prod.html') }),
    new MiniCssExtractPlugin({ filename: 'main-bundle-[fullhash].css' }),
    new ContextReplacementPlugin(
      /^date-fns[/\\]locale$/,
      new RegExp(`\\.[/\\\\](${dateFnsLocales.join('|')})[/\\\\]index\\.js$`)
    )
  ]
})
