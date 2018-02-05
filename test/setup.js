console.time('setup.require');
var hook = require('css-modules-require-hook');
var fs = require('fs');
var sass = require('node-sass');
var scssParser = require('postcss-scss').parse;
var requireHacker = require('require-hacker');
var svgRuntimeGenerator = require('../lib/svgRuntimeGenerator/svgRuntimeGenerator.js');
var _ = require('lodash');
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
console.timeEnd('setup.require');

console.time('setup.hook');
hook({
  extensions: ['.scss'],
  generateScopedName: '[path]___[local]___[hash:base64:5]',
  processorOpts: {parser: scssParser},
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
    }).css
});
console.timeEnd('setup.hook');

console.time('require-hacker hook (for svg)');
requireHacker.hook('svg', path => {
  return svgRuntimeGenerator({
    symbol: {
      request: {
        file: path
      },
      id: _.last(path.split('/')).split('.')[0]
    }
  });
});
console.timeEnd('require-hacker hook (for svg)');

console.time('require-hacker hook (for xml)');
requireHacker.hook('xml', path => {
  return 'module.exports = `' + fs.readFileSync(path, 'utf-8') + '`;\n';
});
console.timeEnd('require-hacker hook (for xml)');

console.time('configure enzyme to work with react 16');
Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true
});
console.timeEnd('configure enzyme to work with react 16');
