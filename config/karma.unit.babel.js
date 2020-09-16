import jsdom from "jsdom";
import path from 'path';

export default function (config) {
  config.set({
    files: [
      {
        pattern: path.join('..', 'test', 'unit', '**', '*_test.js'),
        watched: false,
      }
    ],

    browsers: ['jsdom'],
    singleRun: true,
    concurrency: Infinity,

    jsdomLauncher: {
      jsdom: {
        resources: new jsdom.ResourceLoader()
      }
    },
  });
}
