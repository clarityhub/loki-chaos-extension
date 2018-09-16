import get from 'lodash.get';

import Delay from './utils/Delay';

function fetchFail(settings$) {
  const delay = new Delay();

  if (window.fetch && !window.fetch.injected) {
    window._fetch = window.fetch;

    window.fetch = (...args) => {
      return delay.whenReady((settings) => {
        const chaos = get(settings, ['routines', 'fetch.fail', 'chaos'], 0);

        if (Math.random() < chaos) {
          // Fake a network error for now
          const error = new TypeError('Network request failed');

          return Promise.reject(error);
        }

        return window._fetch(...args);
      });
    };

    window.fetch.injected = true;
  }

  settings$.take((settings) => {
    delay.invokeReady(settings);
  });
};

export default {
  invoke: fetchFail,
  title: 'Fail Fetches',
  description: 'This will only work if window.fetch is used.',
  controls: [{
    name: 'chaos',
    type: 'slider',
    max: 1.0,
    min: 0.0,
    default: 0.0,
  }],
};
