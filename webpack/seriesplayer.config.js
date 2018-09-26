'use strict';
const WebpackSeriesplayer = (IS_STYLEGUIDE = false) => {
  const path = require('path');
  const pkg = require(path.resolve('package.json'));
  const WebpackCommons = require('./webpack.commons');
  const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
  const tsconfig = './tsconfig.start.json';

  const {
    plugins: {
      getLoadersOptionsPlugin,
      getCopyWebpackPlugin,
      getHTMLPlugin,
      getOptimizeCssAssetsPlugin,
      getDefinePlugin,
      getHotModuleReplacementPlugin,
      getMiniCssExtractPlugin,
      getSpriteLoaderPlugin,
      getDllReferencePlugin,
      getStatsWriterPlugin,
      getForkTsCheckerWebpackPlugin
    },
    rules: {
      getTypescriptLoader,
      getSassLoader,
      getUrlLoader,
      getFileLoader
    },
    utils: {
      isProductionMode
    }
  } = WebpackCommons;

  const settings = JSON.stringify(
    require(`../src/settings/${isProductionMode() ? 'production' : 'development'}`)
  );

  const plugins = [
    getLoadersOptionsPlugin(isProductionMode()),
    getForkTsCheckerWebpackPlugin({tsconfig: tsconfig}),
    // The two different behaviours here are dictated by
    IS_STYLEGUIDE ? getSpriteLoaderPlugin() : getCopyWebpackPlugin(),
    IS_STYLEGUIDE ?
      getDllReferencePlugin('../src/components/_styleguide/dist/vendor-manifest.json') :
      getHTMLPlugin({
          title: pkg.name,
          template: 'src/templates/index_seriesplayer.html'
        }
      ),
    getMiniCssExtractPlugin({
      filename: IS_STYLEGUIDE ? './static/css/bundle-[hash:6].css' :
        (isProductionMode() ? 'assets/css/bundle.[hash:6].css' : 'assets/css/bundle.css')
    }),
    getOptimizeCssAssetsPlugin(),
    getDefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(isProductionMode() ? 'production' : 'development')
        }
      }
    }),
    isProductionMode() ? getStatsWriterPlugin('main', IS_STYLEGUIDE, isProductionMode()) : getHotModuleReplacementPlugin()
  ];

  const rules = [
    getTypescriptLoader(),
    getSassLoader(isProductionMode()),
    getUrlLoader({
      test: /\.(jpe?g|png|gif|mp3|wav)(\?.*$|$)/,
      options: {
        name: 'assets/images/[name][hash:6]'
      },
      exclude: IS_STYLEGUIDE ? [
        path.resolve(__dirname, '../src', 'components', 'icons'),
        path.resolve(__dirname, '../src', 'gizmos', 'formula', 'Formula', 'components', 'images')
      ] : []
    }),
    getFileLoader(IS_STYLEGUIDE ?
      {
        test: /\.(ttf|woff2?)$/,
        options: {
          name: '[name].[ext]',
          outputPath: './static/fonts/',
          publicPath: '../fonts/'
        }
      } :
      {
        test: /\.(ico|ttf|eot|woff2?)$/,
        options: {
          name: 'assets/fonts/[name].[ext]',
          publicPath: '../../'
        }
      }),
    {
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, '../src', 'components', 'icons'),
        path.resolve(__dirname, '../src', 'apps', 'seriesplayer', 'containers', 'Toolbar', 'icons'),
        path.resolve(__dirname, '../src', 'gizmos', 'formula', 'Formula', 'components', 'images')],
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
        path.resolve(__dirname, '../src', 'apps', 'seriesplayer', 'containers', 'Toolbar', 'icons'),
        // src/gizmos/formula/Formula/components/images
        path.resolve(__dirname, '../src', 'gizmos', 'formula', 'Formula', 'components', 'images')
      ]
    })
  ];

  return {
    mode: isProductionMode() ? 'production' : 'development',
    entry: {
      'vendor': ['babel-polyfill', 'core-js/modules/es6.symbol', 'react', 'redux', 'whatwg-fetch'],
      'testplayer': ['./src/apps/app.tsx']
    },
    output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: isProductionMode() ? 'assets/js/[name].[hash:6].bundle.js' : 'assets/js/[name].bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, '..', 'dist'),
      host: '0.0.0.0',
      port: IS_STYLEGUIDE ? 6060 : 8100,
      public: isProductionMode() ? 'school.bettermarks.loc**' : '0.0.0.0:8100',
      hot: true,
      inline: true,
      disableHostCheck: true
    },
    // http://webpack.github.io/docs/build-performance.html#sourcemaps
    // Should remember to not push source-maps to servers
    devtool: 'cheap-module-source-map',
    node: {
      fs: 'empty'
    },
    plugins: plugins,
    module: {
      rules: rules
    },
    externals: IS_STYLEGUIDE ?
      {
        react: 'React',
        'react-dom': 'ReactDOM'
      } :
      {
        settings: settings
      },
    resolve: {
      extensions: IS_STYLEGUIDE ? ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.svg'] : ['.ts', '.tsx', '.js', '.svg'],
      plugins: [
        new TsconfigPathsPlugin({configFile: tsconfig})
      ],
      modules: [
        path.resolve('./node_modules')
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendorCss: {
            name: 'bm',
            test: m => m.constructor.name === 'CssModule',
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
  };
};

module.exports = WebpackSeriesplayer;
