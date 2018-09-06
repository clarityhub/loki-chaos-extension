'use strict';
require('babel-core/register')();

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const Mocha = require('mocha-webpack');
const glob = require('glob');
const path = require('path');
const config = require('../config/webpack.config.test');

require('../test-boot');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const argv = process.argv.slice(2);

// Instantiate a Mocha instance.
var mocha = new Mocha();
mocha.options.webpackConfig = config;
mocha.interactive(false);

function run() {
  argv.forEach((arg) => {
    if (arg.indexOf('--grep') !== -1) {
      mocha.options.grep = arg.match('="*(.*)"*')[1];
    }
  });

  if (argv.indexOf('--watch') !== -1) {
    mocha.watch();
  } else {
    mocha.run(function (failures) {
      process.on('exit', function () {
        process.exit(failures);
      });
    });
  }
}

glob(path.join(__dirname, '..', 'src/**/*.test.js'), function (er, files) {
  mocha.entries = [path.join(__dirname, '..', 'test-boot.js')].concat(files);
  run();
});
