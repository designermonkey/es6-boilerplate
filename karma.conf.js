// Karma configuration
// Generated on Thu Sep 03 2020 16:16:49 GMT+0100 (British Summer Time)

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      {
        pattern: 'test/*_test.js',
        watched: false,
      },
      {
        pattern: 'test/**/*_test.js',
        watched: false,
      }
    ],
    preprocessors: {
      'test/*_test.js': ['webpack', 'sourcemap'],
      'test/**/*_test.js': ['webpack', 'sourcemap'],
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['ChromeHeadless', 'PhantomJS'],
    singleRun: true,
    concurrency: Infinity,

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
    },

    webpackMiddleware: {
      stats: 'errors-only',
    },
  });
}
