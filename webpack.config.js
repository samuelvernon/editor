const path = require("path");
// const fs = require( 'fs-extra' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack'); 

let inputFolder = 'src';
let outputFolder = 'build';
let buildOptions = {};

buildOptions.template = {
  template: './' + inputFolder + '/index.html',
  favicon: './' + inputFolder + '/img/favicon.png',
  inject: 'body',
};

buildOptions.output = {
  path: path.resolve(__dirname, outputFolder),
  filename: 'js/[name].[fullhash].js',
  publicPath: '/',
  clean: true,
};

buildOptions.cssExtractPluginOptions = {
  filename: 'css/[name].[fullhash].css',
  ignoreOrder: true
};

buildOptions.resolve = {
  extensions: ['.js', '.ts']
};

buildOptions.modulesRules = [
  {
    test: /\.ts$|\.js$/,
    use: 'ts-loader',
    exclude: [
      path.resolve(__dirname, 'node_modules'),
      // path.resolve( __dirname, 'js' )
    ],
    include: [path.resolve(__dirname, inputFolder)]
  }, {
    test: /\.(sa|sc|c)ss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
  }, {
    test: /\.(htm?l)$/i,
    use: 'raw-loader'
  }
];

buildOptions.plugins = [
  new HtmlWebpackPlugin(buildOptions.template),
  new MiniCssExtractPlugin(buildOptions.cssExtractPluginOptions),
  new CopyPlugin({
    patterns: [
      { from: 'src/img', to: 'img' },
      // { from: './node_modules/pdfjs-dist/build/pdf.worker.min.mjs', to: path.resolve(__dirname, 'wwwroot') + '/js/pdf.worker.min.mjs' }
    ],
  }),
];

module.exports = {
  entry: {
    'index': './src/ts/index.ts'
  },
  output: buildOptions.output,
  resolve: buildOptions.resolve,
  stats: {
    builtAt: true,
    colors: true,
    excludeModules: true,
    errors: true,
    hash: false,
    warnings: true,
    assets: true,
    depth: true,
    entrypoints: false,
    env: true,
    logging: 'error',
    loggingTrace: false,
    modules: true
  },
  module: {
    rules: buildOptions.modulesRules
  },
  plugins: buildOptions.plugins
};