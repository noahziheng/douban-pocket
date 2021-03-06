const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            [
              'import',
              {
                libraryName: 'antd-mobile',
                style: 'css'
              }
            ] // Ant Design import dependency
          ]
        }
      }
    }]
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    // 加入 html 模板任务
    new HtmlWebpackPlugin({
      // 模板文件
      template: 'src/index.html',
      // 打包后文件名称，会自动放到 output 指定的 dist 目录
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: 'assets'
    }]),
    new ExtractTextPlugin('styles.css'),
    new UglifyJsPlugin()
  ]
}
