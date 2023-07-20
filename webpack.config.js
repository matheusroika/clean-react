const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
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
    static: { directory: path.resolve(__dirname, 'public') },
    historyApiFallback: true,
    devMiddleware: { writeToDisk: true }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
