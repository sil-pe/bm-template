'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');


/**************** LOADERS *********************/
const getLoadersOptionsPlugin = isProductionMode => {
  return new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: !isProductionMode,
    options: {
      context: __dirname
    }
  });
}

const getSassLoader = isProductionMode => {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const generateScopedName = require('../lib/css_minifier/cssname_minifier').generateScopedName;

  const getlocalIdent =
    isProductionMode
      ? (context, localIdentName, localName) => {
        return generateScopedName(localName, context.resourcePath);
      }
      : undefined;

  return {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          // publicPath: '../',
          sourceMap: true
        }
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          getLocalIdent: getlocalIdent,
          camelCase: true,
          minimize: true,
          sourceMap: true
        }
      }, {
        loader: 'resolve-url-loader',
        options: {
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [
            '../src/components/_sass'
          ]
            .map((d) => path.join(__dirname, d))
        }
      }
    ]
  };

};

const getFileLoader = customParams => {

  return merge.smart(
    {
      test: /\.(ico|ttf|eot|woff2?)$/,
      loader: 'file-loader',
      options: {
        name: '[name].ext',
        publicPath: '../'
      }
    },
    customParams
  );

};

const getSourceMapLoader = () => {

  return {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader'
  };

};

const getTypescriptLoader = (tsconfig = 'tsconfig.start.json') => {
  return {
    test: /\.ts(x?)$/,
    exclude: /node_modules|vendor/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, '..', '.cache', 'cache-loader')
        }
      },
      {
        loader: 'babel-loader',
        options: {
          plugins: 'react-hot-loader/babel'
        }
      },
      {
        loader: 'thread-loader',
        options: {
          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          workers: require('os').cpus().length - 1,
        },
      },
      {
        loader: 'ts-loader',
        options: {
          // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
          happyPackMode: true
        }
      }
    ]
  };
};

const getForkTsCheckerWebpackPlugin = (config) => {
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
  return new ForkTsCheckerWebpackPlugin(merge.smart(
    config,
    {
      checkSyntacticErrors: true,
      silent: true
    }
  ))
}

const getSvgLoader = customParams => {

  return merge.smart(
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true, // this creates an external sprite file
            esModule: false, // no default export
            runtimeGenerator: require.resolve(
              '../lib/svgRuntimeGenerator/svgRuntimeGenerator.js'
            )
          }
        },
        'svgo-loader' // optimizer for svg
      ]
    },
    customParams
  );

};

const getUrlLoader = customParams => {

  return merge.smart(
    {
      test: /\.svg$/,
      loader: 'url-loader'
    },
    customParams
  );

};

const getRawLoader = customParams => {
  return merge.smart({ /* For loading raw files (xml and json) in GizmoViewer */
    test: /\.xml|json$/,
    exclude: /node_modules|src/,
    loader: 'raw-loader'
  }, customParams);
};

const getJsLoader = () => {

  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader'
    }]
  };

};

/**************** PLUGINS *********************/

const getCleanWebpackPlugin = (vendorPath, rootDir) => {

  const CleanWebpackPlugin = require('clean-webpack-plugin');

  return new CleanWebpackPlugin(...vendorPath, {
    root: rootDir,
    verbose: true,
    exclude: ['node_modules/*']
  });

};

const getCopyWebpackPlugin = () => {
  // Helps to copy the xmls from the specific path to required path
  // flatten: true, just copy the files and ignore the folder path
  // force: true, overwrite the files even though they exist
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  return new CopyWebpackPlugin([
    {
      from: './test/gizmos/*.xml',
      to: './assets/xml/',
      force: true,
      flatten: true
    },
    {
      from: './test/exercises/*.xml',
      to: './assets/xml/',
      force: true,
      flatten: true
    }
  ]);
};

const getMiniCssExtractPlugin = customParams => {

  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  return new MiniCssExtractPlugin(
    merge.smart(
      {
        filename: '[name].css',
      },
      customParams
    )
  );

};

const getStatsWriterPlugin = (context, IS_STYLEGUIDE, IS_PRODUCTION_MODE) => {
  const {StatsWriterPlugin} = require('webpack-stats-plugin');
  return new StatsWriterPlugin({
    filename: `${IS_STYLEGUIDE ? '../../../' : ''}../webpack/stats/${context}-${
      IS_STYLEGUIDE ? 'styleguide-' : ''}${IS_PRODUCTION_MODE ? 'production' : 'development'}.json`
  });
};

const getDefinePlugin = config => {
  return new webpack.DefinePlugin(config);
};

const getDllPlugin = (path, name) => {

  return new webpack.DllPlugin({
    path,
    name
  });

};

const getDllReferencePlugin = manifestPath => {

  return new webpack.DllReferencePlugin({
    context: '../',
    manifest: require(manifestPath)
  });

};

const getSpriteLoaderPlugin = () => {

  const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
  return new SpriteLoaderPlugin();

};

const getOptimizeCssAssetsPlugin = () => {

  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  return new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.s?css$/,
    cssProcessorOptions: {
      safe: true,
      discardDuplicates: {
        removeAll: true
      },
      discardComments: {
        removeAll: true
      }
    },
    canPrint: false
  });
};

const getHTMLPlugin = customParams => {

  const HtmlWebpackPlugin = require('html-webpack-plugin');

  return new HtmlWebpackPlugin(merge.smart({
    title: 'My App',
    template: 'template.html',
    filename: './index.html'
  }, customParams));

};

const getHotModuleReplacementPlugin = () => {
  return new webpack.HotModuleReplacementPlugin();
};

const isProductionMode = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  return NODE_ENV === 'production';
};

module.exports = {
  rules: {
    getSassLoader,
    getFileLoader,
    getTypescriptLoader,
    getSvgLoader,
    getUrlLoader,
  },
  plugins: {
    getLoadersOptionsPlugin,
    getCleanWebpackPlugin,
    getCopyWebpackPlugin,
    getMiniCssExtractPlugin,
    getDllPlugin,
    getDllReferencePlugin,
    getSpriteLoaderPlugin,
    getOptimizeCssAssetsPlugin,
    getDefinePlugin,
    getHTMLPlugin,
    getHotModuleReplacementPlugin,
    getStatsWriterPlugin,
    getForkTsCheckerWebpackPlugin
  },
  utils: {
    isProductionMode
  }
};
