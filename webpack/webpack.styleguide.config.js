'use strict';

const path = require('path');
const WebpackCommons = require('./webpack.commons');

const { utils: { isProductionMode } } = WebpackCommons;

const WebpackStyleguidist = (() => {

  const run = async () => {

    console.log('Running Styleguide');

    const tsconfig = 'tsconfig.start.json';
    const styleguidist = require('react-styleguidist');
    const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

    const {
      plugins: {
        getExtractTextPlugin,
        getSpriteLoaderPlugin,
        getOptimizeCssAssetsPlugin,
        getDllReferencePlugin,
        getDefinePlugin,
        getHotModuleReplacementPlugin
      },
      loaders: {
        getSourceMapLoader,
        getTypescriptLoader,
        getSassLoader,
        getFileLoader,
        getSvgLoader,
        getUrlLoader
      },
      utils: {
        compiler,
        getDevServer,
        generateWebpackStats
      }
    } = WebpackCommons;

    const plugins = [
      getExtractTextPlugin({
        filename: './static/css/bundle-[hash:6].css',
        disable: !isProductionMode(),
        allChunks: true
      }),
      getSpriteLoaderPlugin(),
      getOptimizeCssAssetsPlugin(),
      getDllReferencePlugin('../src/components/_styleguide/dist/vendor-manifest.json'),
      new CheckerPlugin()
    ];

    if (isProductionMode()) {

      plugins.push(
        getDefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      );

    } else {
      plugins.push(getHotModuleReplacementPlugin());
    }

    const rules = [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      getSourceMapLoader(),
      getTypescriptLoader(),
      getSassLoader(isProductionMode()),
      getFileLoader({
        test: /\.(ttf|woff2?)$/,
        options: {
          name: '[name].[ext]',
          outputPath: './static/fonts/',
          publicPath: '/'
        }
      }),
      // Adds svg files as symbols to DOM, can be accessed by id = svg-filename
      // in 'src/components/icons': create react components of each icon using the svg generator
      getSvgLoader({
        include: [
          path.resolve(__dirname, '../src', 'components', 'icons'),
          path.resolve(__dirname, '../src', 'components', 'MathML', 'images')
        ]
      }),
      // outside of src/components/icon: just collect the svg into the symbol map and extract its id
      // this can be used in javascript or in CSS
      getUrlLoader({
        exclude: [
          path.resolve(__dirname, '../src', 'components', 'icons'),
          path.resolve(__dirname, '../src', 'components', 'MathML', 'images')
        ]
      })
    ];

    const webpackConfig = {
      context: path.resolve(__dirname, '../'),
      entry: {
        index: ['./src/index.tsx'],
        vendor: ['./vendor']
      },
      output: {
        path: './static/js',
        filename:
          isProductionMode()
            ? '[name].[hash:6].bundle.js'
            : '[name].bundle.js'
      },
      devServer: {
        disableHostCheck: true,
        stats: {
          warnings: false,
          warningsFilter: warning => {
            console.log('warning: ' + warning);
            return true;
          }
        }
      },
      stats: {
        warnings: false
      },
      resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.svg'],
        plugins: [new TsConfigPathsPlugin(tsconfig)]
      },
      devtool: isProductionMode() ? '' : 'cheap-module-source-map',
      module: {
        rules: rules
      },
      plugins: plugins,
      // When importing a module whose path matches one of the following, just
      // assume a corresponding global variable exists and use that instead.
      // This is important because it allows us to avoid bundling all of our
      // dependencies, which allows browsers to cache those libraries between builds.
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    };

    if (!isProductionMode) {
      webpackConfig.entry.index.unshift('webpack-dev-server/client?http://localhost:6060/', 'webpack/hot/dev-server');
    }

    const styleguideConfig = require('../src/components/_styleguide/styleguide.config');
    styleguideConfig.webpackConfig = webpackConfig;

    if (isProductionMode()) {

      console.log('Running styleguide build');

      styleguidist(styleguideConfig).build((err, config, stats) => {

        if (err) return console.error(err);
        console.log('Style guide published to', config.styleguideDir);
        generateWebpackStats(stats.toJson(), 'WebpackStyleguide');

      });

    } else {

      console.log('Running styleguide server');

      styleguidist(styleguideConfig).server((err, config) => {

        if (err) return console.error(err);
        console.log(`Listening at http://${config.serverHost}:${config.serverPort}`);

      });

    }

  };

  return {
    run
  };

})();

module.exports = WebpackStyleguidist;
