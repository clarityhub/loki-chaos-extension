const merge = require('webpack-merge');
const config = require('./webpack.config.base');

module.exports = merge(config, {
  watch: Boolean(process.env.WATCH),
});
