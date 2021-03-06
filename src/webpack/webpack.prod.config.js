'use strict';

const webpack = require('webpack');
const workboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const css = require('./css');

function prod() {
  return {
    mode: 'production',
    module: {
      rules: [css('prod')]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new workboxPlugin.GenerateSW()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }
        })
      ]
    }
  };
}

module.exports = prod;
