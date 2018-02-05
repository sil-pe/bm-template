'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');

const WebpackJsVendor = require('./webpack/webpack.js-vendor.config');
const WebpackCssVendor = require('./webpack/webpack.css-vendor.config');
const WebpackStyleguidist = require('./webpack/webpack.styleguide.config');
const WebpackApp = require('./webpack/webpack.app.config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const TARGET = process.env.TARGET || 'STYLEGUIDE';

const BUILD_PIPELINE = {};
BUILD_PIPELINE['STYLEGUIDE_DEVELOPMENT']   = [ WebpackCssVendor, WebpackJsVendor, WebpackStyleguidist ];
BUILD_PIPELINE['STYLEGUIDE_PRODUCTION']    = [ WebpackCssVendor, WebpackJsVendor, WebpackStyleguidist ];
BUILD_PIPELINE['APP_DEVELOPMENT'] = [ WebpackCssVendor, WebpackApp ];
BUILD_PIPELINE['APP_PRODUCTION']  = [ WebpackCssVendor, WebpackApp ];

const runBuild = async () => {

  const buildMode = `${TARGET}_${NODE_ENV}`.toUpperCase();

  for (let i = 0; i < BUILD_PIPELINE[buildMode].length; i++) {

    const webpackProcess = BUILD_PIPELINE[buildMode][i];

    if (webpackProcess && webpackProcess.run) {
      await webpackProcess.run.call();
    } else {
      console.log(`Run method must exist at index ${i}`);
    }

  }

};

runBuild();
