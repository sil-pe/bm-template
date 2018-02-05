'use strict';

const path = require('path');
const WebpackCommons = require('./webpack.commons');

const WebpackJsVendor = (() => {

  const run = async () => {

    console.log('Running js-vendor');

    const {
      plugins: {
        getDllPlugin
      },
      utils: {
        compile
      }
    } = WebpackCommons;

    const webpackConfig = {
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
        )
      ]
    };

    await compile(webpackConfig, 'webpackJsVendor');

  };

  return {
    run
  };

})();

module.exports = WebpackJsVendor;
