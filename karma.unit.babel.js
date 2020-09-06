import jsdom from "jsdom";

// Karma configuration
// Generated on Thu Sep 03 2020 16:16:49 GMT+0100 (British Summer Time)

export default function (config) {
  config.set({
    files: [
      {
        pattern: 'test/unit/**/*_test.js',
        watched: false,
      }
    ],

    browsers: ['jsdom'],
    singleRun: true,
    concurrency: Infinity,

    jsdomLauncher: {
      jsdom: {
        resources: new jsdom.ResourceLoader({
          userAgent: "foobar",
        })
      }
    },
  });
}
