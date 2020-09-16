import path from 'path';

export default function (config) {
  config.set({
    files: [
      {
        pattern: path.join('..', 'test', 'behaviour', '**', '*_test.js'),
        watched: false,
      }
    ],
    browsers: ['ChromeHeadless', 'PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
}
