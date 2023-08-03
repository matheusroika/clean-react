const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/main/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist',
    filename: 'main-bundle-[fullhash].js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
