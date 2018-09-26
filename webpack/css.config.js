'use strict';
const WebpackCssVendor = () => {

  function recursiveIssuer(m) {
    if (m.issuer) {
      return recursiveIssuer(m.issuer);
    } else if (m.name) {
      return m.name;
    } else {
      return false;
    }
  }

  const path = require('path');
  const WebpackCommons = require('./webpack.commons');

  const TARGET = process.env.TARGET || 'STYLEGUIDE';
  const {
    utils: {
      isProductionMode
    },
    rules: {
      getSassLoader,
      getFileLoader
    },
    plugins: {
      getCleanWebpackPlugin,
      getMiniCssExtractPlugin,
      getStatsWriterPlugin
    },
  } = WebpackCommons;
  const IS_STYLEGUIDE = (TARGET === 'STYLEGUIDE');

  let VENDOR_PATH = path.resolve(__dirname, '..', 'dist');

  if (IS_STYLEGUIDE){
    VENDOR_PATH = path.resolve(__dirname, '..', 'src', 'components', '_styleguide', 'dist');
  }

  return {
    context: path.resolve(__dirname, '../'),
    entry: {
      'reset-and-fonts': [
        './src/components/_sass/base/reset.scss',
        './src/components/_sass/base/fonts.scss',
        './src/components/_sass/base/global.scss'
      ]
    },
    output: {
      path: VENDOR_PATH,
      filename: path.join('assets', 'css', '[name].dummy')
    },
    mode: isProductionMode() ? 'production' : 'development',
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
      getMiniCssExtractPlugin({
        filename: path.join('assets', 'css', '[name].css')
      }),
      getStatsWriterPlugin('css', IS_STYLEGUIDE, isProductionMode())
    ],
    resolve: {
      extensions: ['.js', '.scss', '.css']
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendorCss: {
            name: 'reset-and-fonts',
            test: (m,c,entry = 'reset-and-fonts') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
  };
};

module.exports = WebpackCssVendor;
