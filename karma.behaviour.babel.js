
// Karma configuration
// Generated on Thu Sep 03 2020 16:16:49 GMT+0100 (British Summer Time)

export default function (config) {
  config.set({
    files: [
      {
        pattern: 'test/behaviour/**/*_test.js',
        watched: false,
      }
    ],
    browsers: ['ChromeHeadless', 'PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
}
