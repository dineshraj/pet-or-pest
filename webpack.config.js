const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'production';
const isProduction = env === 'production';
const mode = isProduction ? 'production' : 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getPlugins() {
  return [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      }
    }),
    new HtmlWebpackPlugin({
      title:
        'Pet or Pest? Choose whether you think the animal is a pet or a pest!',
      template: 'src/views/index.html',
      favicon: 'src/static/favicon.png',
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.[chunkhash].css' })
  ];
}

module.exports = {
  mode,
  entry: path.resolve(__dirname, './client.jsx'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.[chunkhash].js'
  },
  devtool: isProduction ? false : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader'
          },
        ]
      }
    ]
  },
  optimization: {
    minimize: isProduction,
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: getPlugins()
};
