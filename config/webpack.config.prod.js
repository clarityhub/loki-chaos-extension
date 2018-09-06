const merge = require('webpack-merge');
// const webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');
const config = require('./webpack.config.base');

// Polyfills for every entry point
const entries = paths.entries;

for (let key in entries) {
  entries[key] = [require.resolve('./polyfills'), entries[key]];
}

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = merge.smart(config, {
  // Don't attempt to continue if there are any errors.
  bail: true,
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          comparisons: false,
        },
        output: {
          comments: false,
          ascii_only: true,
        },
        sourceMap: false,
      },
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
});
