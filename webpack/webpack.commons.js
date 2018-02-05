'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

/**************** LOADERS *********************/
const getSassLoader = isProductionMode => {

  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const generateScopedName = require('../lib/css_minifier/cssname_minifier').generateScopedName;

  const getlocalIdent =
    isProductionMode
      ? (context, localIdentName, localName) => {
          return generateScopedName(localName, context.resourcePath);
        }
      : undefined;

  return {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 1,
          localIdentName: '[path]___[local]___[hash:base64:5]',
          getLocalIdent: getlocalIdent,
          camelCase: true,
          minimize: true
        }
      }, {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    })
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

const getTypescriptLoader = () => {

  const tsconfig = 'tsconfig.start.json';

  return {
    test: /\.ts(x?)$/,
    exclude: /node_modules|vendor/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: tsconfig,
          useBabel: true,
          useCache: true
        }
      }
    ]
  };

};

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

const getJsonLoader = () => {

  return {
    test: /\.json$/,
    loader: 'json'
  };

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
    dry: !isProductionMode(),
    exclude: ['node_modules/*']
  });

};

const getExtractTextPlugin = customParams => {

  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  return new ExtractTextPlugin(
    merge.smart(
      {
        filename: '[name].css',
        allChunks: true
      },
      customParams
    )
  );

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

  const cssnano = require('cssnano');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  return new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: {
      discardDuplicates: {
        removeAll: true
      },
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    },
    canPrint: false
  });
};


const getCheckerPlugin = () => {

  const { CheckerPlugin } = require('awesome-typescript-loader');
  return new CheckerPlugin();

};

const getHTMLPlugin = customParams => {

  const HtmlWebpackPlugin = require('html-webpack-plugin');

  return new HtmlWebpackPlugin(merge.smart({
    title: 'My App',
    template: 'template.html',
    filename: './index.html'
  }, customParams));

};

const getCommonsChunkPlugin = (customParams = {}) => {

  return new webpack.optimize.CommonsChunkPlugin(merge.smart({
    name: 'vendor',
    minChunks: Infinity
  }, customParams));

};

const getMinifyPlugin = () => {

  const MinifyPlugin = require('babel-minify-webpack-plugin');
  return new MinifyPlugin();

};

const getHotModuleReplacementPlugin = () => {
  return new webpack.HotModuleReplacementPlugin();
};

/**************** UTILS *********************/

const getDevServer = () => {

  return {
    disableHostCheck: true,
    stats: {
      warnings: false,
      warningsFilter: warning => {
        console.log('warning: ' + warning);
        return true;
      }
    }
  };

};

const generateWebpackStats = (info, webpackProcessName) => {

  const fs = require('fs');
  const dir = path.resolve(__dirname, 'stats');

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile(path.resolve(__dirname, `./stats/${webpackProcessName}-stats.json`), JSON.stringify(info), function(err) {

    if(err) return console.log(err);
    console.log(`${webpackProcessName}-stats.json were saved successfully!`);

  });

}

const createHotDevServer = webpackConfig => {

  const webpackHotMiddleware = require('webpack-hot-middleware');
  const WebpackDevServer = require("webpack-dev-server");

  const port = 8100;
  const compiler = webpack(webpackConfig);

  var server = new WebpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'dist',
    hot: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    quiet: false,
    noInfo: false,
    watchOptions: {
      poll: true
    }
  });
  server.listen(port);

};

const isProductionMode = () => {

  const NODE_ENV = process.env.NODE_ENV || 'development';
  const isProductionMode = NODE_ENV === 'production';

  return isProductionMode;

};

const compile = (configObject, webpackProcessName) => {

  return new Promise((fulfill, reject) => {

    webpack(configObject, (err, stats) => {

      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
      }

      const info = stats.toJson();
      generateWebpackStats(info, webpackProcessName);

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      console.log(`Done processing task -> ${webpackProcessName}`);
      console.log(
        stats.toString({
          assets: true,
          colors: true,
          chunks: false,
          errors: true,
          timings: true,
          version: true,
          warnings: true
        })
      );
      fulfill();

    });

  });

};

module.exports = {
  loaders: {
    getSassLoader,
    getFileLoader,
    getSourceMapLoader,
    getTypescriptLoader,
    getSvgLoader,
    getUrlLoader,
    getJsonLoader,
    getRawLoader,
    getJsLoader
  },
  plugins: {
    getCleanWebpackPlugin,
    getExtractTextPlugin,
    getDllPlugin,
    getDllReferencePlugin,
    getSpriteLoaderPlugin,
    getOptimizeCssAssetsPlugin,
    getDefinePlugin,
    getCommonsChunkPlugin,
    getMinifyPlugin,
    getCheckerPlugin,
    getHTMLPlugin,
    getHotModuleReplacementPlugin
  },
  utils: {
    getDevServer,
    compile,
    generateWebpackStats,
    createHotDevServer,
    isProductionMode
  }
};
