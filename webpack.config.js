const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

var config = {
  entry: {
    //context: path.resolve(__dirname, 'dev'),
    'app/js/app': './dev/app/js/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'ops'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname,'dev/app'),
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  plugins: [
		new CopyPlugin([
      { from: './dev/server.js', to: 'server.js' },
      { from: './dev/passport.js', to: 'passport.js' },
      { from: './dev/app/index.html', to: 'app/index.html' },
		]),
	]
};

module.exports = config;