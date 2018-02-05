'use strict';

const path = require('path');
const WebpackCommons = require('./webpack.commons');

const TARGET = process.env.TARGET || 'STYLEGUIDE';
const { utils: { isProductionMode } } = WebpackCommons;

const WebpackCssVendor = (() => {

    const run = async () => {

      console.log('Running css-vendor');

      const {
        utils: {
          getVendorPath,
          compile
        },
        loaders: {
          getSassLoader,
          getFileLoader
        },
        plugins: {
          getCleanWebpackPlugin,
          getExtractTextPlugin
        }
      } = WebpackCommons;

      let VENDOR_PATH = path.resolve(__dirname, '../dist');

      if (TARGET === 'STYLEGUIDE'){
        VENDOR_PATH = path.resolve(__dirname, '../src', 'components', '_styleguide', 'dist');
      }

      const OUTPUT_PATH = 'assets/css/reset-and-fonts.css';

      const webpackConfig = {
        context: path.resolve(__dirname, '../'),
        entry: [
          './src/components/_sass/base/reset.scss',
          './src/components/_sass/base/fonts.scss',
          './src/components/_sass/base/global.scss'
        ],
        output: {
          path: VENDOR_PATH,
          filename: OUTPUT_PATH
        },
        module: {
          rules: [
            getSassLoader(isProductionMode()),
            getFileLoader({
              options: {
                name: 'assets/fonts/[name].[ext]',
                publicPath: '../../'
              }
            })
          ]
        },
        plugins: [
          getCleanWebpackPlugin([VENDOR_PATH], path.resolve(__dirname, '../')),
          getExtractTextPlugin({
            filename: OUTPUT_PATH
          })
        ],
        resolve: {
          extensions: ['.scss', '.css']
        }
      };

      await compile(webpackConfig, 'webpackCssVendor');

    };

    return {
      run
    };

  })();

  module.exports = WebpackCssVendor;
