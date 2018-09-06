var nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
var isCoverage = process.env.COVER === 'true';

const dev = require('./webpack.config.dev');

const rules = [
  isCoverage ? {
    test: /\.js$|\.jsx$/,
    use: {
      loader: 'istanbul-instrumenter-loader',
      options: { esModules: true },
    },
    include: [
      paths.appSrc,
      paths.themeSrc,
    ],
    enforce: 'post',
  } : {},
].concat(dev.module.rules);

module.exports = Object.assign({}, dev, {
  module: Object.assign({}, dev.module, {
    rules: rules,
  }),
  target: 'node', // webpack should compile node compatible code
  externals: [ nodeExternals({
    whitelist: [
      /theme-claire/,
    ],
  })],
  devtool: 'inline-cheap-module-source-map',
});
