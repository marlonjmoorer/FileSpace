var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname,'static');
var APP_DIR = path.resolve(__dirname,'client', 'src');

module.exports = {
  entry: `${APP_DIR}/index.js`,
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['stage-2', 'react']
              }
          }, { test: /\.css$/,loaders: ['style-loader', 'css-loader']}
      ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};