'use strict';
const WebpackJsVendor = () => {
  const path = require('path');
  const WebpackCommons = require('./webpack.commons');
  const {
    plugins: {
      getDllPlugin,
      getStatsWriterPlugin
    },
    utils: {
      isProductionMode
    }
  } = WebpackCommons;

  return {
    mode: isProductionMode() ? 'production' : 'development',
    context: path.resolve(__dirname, '../'),
    entry: {
      'vendor': ["babel-polyfill", "core-js/modules/es6.symbol", "react", "react-dom", "redux", "redux-saga", "lodash"]
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(
        __dirname, '../src', 'components', '_styleguide', 'dist'
      ),
      library: '[name]_lib'
    },

    plugins: [
      getDllPlugin(
        './src/components/_styleguide/dist/[name]-manifest.json',
        '[name]_lib'
      ),
      getStatsWriterPlugin('js', true, isProductionMode())
    ]
  };
};

module.exports = WebpackJsVendor;
