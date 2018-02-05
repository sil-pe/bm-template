'use strict';

const path = require('path');
const webpack = require('webpack');
const pkg = require(path.resolve('package.json'));

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCommons = require('./webpack.commons');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const { utils: { isProductionMode } } = WebpackCommons;

const WebpackApp = (() => {

  const run = async () => {

    const tsconfig = 'tsconfig.start.json';
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    const {
      plugins: {
        getCheckerPlugin,
        getHTMLPlugin,
        getCommonsChunkPlugin,
        getExtractTextPlugin,
        getOptimizeCssAssetsPlugin,
        getDefinePlugin,
        getMinifyPlugin,
        getHotModuleReplacementPlugin
      },
      loaders: {
        getTypescriptLoader,
        getSassLoader,
        getUrlLoader,
        getSvgLoader,
        getRawLoader,
        getFileLoader,
        getJsonLoader
      },
      utils: {
        getDevServer,
        createHotDevServer,
        compile
      }
    } = WebpackCommons;

    const plugins = [
      getCheckerPlugin(),
      getHTMLPlugin({
        title: pkg.name,
        template: 'src/templates/index_app.html'
      }),
      getCommonsChunkPlugin(),
      new ExtractTextPlugin({
        filename: isProductionMode() ? 'assets/css/bundle.[hash:6].css' : 'assets/css/bundle.css',
        disable: false,
        allChunks: true
      }),
      getOptimizeCssAssetsPlugin()
    ];

    if (isProductionMode()) {

      plugins.push(
        getDefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        getMinifyPlugin()
      );

    } else {
      plugins.push(getHotModuleReplacementPlugin());
    }

    const loaders = [
      getJsonLoader()
    ];

    const rules = [
      getTypescriptLoader(),
      getSassLoader(),
      getUrlLoader({
        test: /\.(jpe?g|png|gif|mp3|wav)(\?.*$|$)/,
        options: {
          name: 'assets/images/[name][hash:6]'
        }
      }),
      getFileLoader({
        test: /\.(ico|ttf|eot|woff2?)$/,
        options: {
          name: 'assets/fonts/[name].[ext]',
          publicPath: '../../'
        }
      }),
      getRawLoader(),
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, '../src', 'components', 'icons'),
          path.resolve(__dirname, '../src', 'components', 'MathML', 'images')],
        use: [{
            loader: 'svg-sprite-loader',
            options: {
              extract: false,
              esModule: false, // no default export
              runtimeGenerator: require.resolve('../lib/svgRuntimeGenerator/svgRuntimeGenerator.js')
            }
          }
        ]
      },
      getUrlLoader({
        exclude: [
          path.resolve(__dirname, '../src', 'components', 'icons'),
          path.resolve(__dirname, '../src', 'components', 'MathML', 'images')
        ]
      })
    ];

    const settings = isProductionMode() ? JSON.stringify(require('../src/config/production.json')) :
      JSON.stringify(require('../src/config/development.json'));

    const webpackConfig = {
      entry: {
        'vendor': ['babel-polyfill', 'core-js/modules/es6.symbol', 'react', 'redux', 'whatwg-fetch'],
        'testplayer': ['./src/app.tsx']
      },
      output: {
        path: path.join(__dirname, '../dist'),
        filename: isProductionMode() ? 'assets/js/[name].[hash:6].bundle.js' : 'assets/js/[name].bundle.js'
      },
      devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: '0.0.0.0',
        port: 8100,
        public: 'school.bettermarks.loc**',
        hot: true,
        inline: true,
        disableHostCheck: true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        }
      },
      // http://webpack.github.io/docs/build-performance.html#sourcemaps
      // Should remember to not push source-maps to servers
      devtool: isProductionMode() ? '' : 'cheap-module-source-map',
      node: {
        fs: 'empty'
      },
      plugins: plugins,
      module: {
        loaders: loaders,
        rules: rules
      },
      externals: {
        settings: settings
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.svg'],
        plugins: [
          new TsConfigPathsPlugin(tsconfig)
        ],
        modules: [
          path.resolve('./node_modules')
        ]
      }
    };

    if (isProductionMode()) {
      await compile(webpackConfig, 'WebpackApp');
    } else {

      webpackConfig.entry.testplayer.unshift('webpack-dev-server/client?http://localhost:8100/', 'webpack/hot/dev-server');
      console.log('Hot Module Replacement activated');
      createHotDevServer(webpackConfig);

    }

  };

  return {
    run
  };

})();

module.exports = WebpackApp;
