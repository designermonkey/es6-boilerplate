require('@babel/register');

const { parseConfig } = require('karma').config;
const path = require('path');
const { argv } = require("yargs");

module.exports = function (config) {

  let additionalConfig = {};

  if (argv.unit) {
    additionalConfig = parseConfig(path.join(__dirname, 'karma.unit.babel.js'))
  }

  if (argv.behaviour) {
    additionalConfig = parseConfig(path.join(__dirname, 'karma.behaviour.babel.js'))
  }

  config.set(additionalConfig);
  config.set({

    frameworks: ['mocha'],

    preprocessors: {
      '../test/**/*_test.js': ['webpack', 'sourcemap', 'coverage'],
    },

    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    captureConsole: true,
    logLevel: config.LOG_WARNING,

    coverageReporter: {
      dir: path.join('..', 'test', 'coverage')
    },

    webpack: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {}
            },
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only',
    },

  });
}
