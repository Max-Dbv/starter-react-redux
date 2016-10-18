const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const path = require('path');

const parts = require('./webpack.parts');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'assets/src/js'),
  style: path.join(__dirname, 'assets/src/less', 'style.less'),
  build: path.join(__dirname, 'assets/dist')
};

const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'assets/src/index.ejs'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
  config = merge(
    common,
    {
      devtool: 'source-map'
    },
    {
      output: {
        path: PATHS.build,
        filename: '[name].js',
        publicPath: '/assets/'
      },
    },
    parts.setFreeVariable(
      'process.env.NODE_ENV',
      'production'
    ),
    parts.extractBundle({
      name: 'vendor',
      entries: ['react', 'react-dom', 'react-redux', 'redux', 'react-router']
    }),
    parts.minify(),
    parts.extractCSS(PATHS.style)
  );
    break;
  case 'dev':
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      {
        output: {
          path: PATHS.build,
          filename: '[name].js',
          publicPath: '/'
        },
      },
      parts.setupCSS(PATHS.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: 3001
      })
    );
}

module.exports = config;
