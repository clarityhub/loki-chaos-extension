import Promise from 'overrides/promise';
import Delay from './utils/Delay';

function promiseThrow(settings$) {
  let { delay } = window.Promise;

  if (!window.Promise || !window.Promise.injected) {
    window.Promise = Promise;
    window.Promise.delay = new Delay();
    ({ delay } = window.Promise);
  }

  settings$.take((settings) => {
    delay.invokeReady(settings);
  });
};

export default {
  invoke: promiseThrow,
  title: 'Reject Promises',
  description: 'Change promises to reject instead of resolve.',
  controls: [{
    name: 'chaos',
    type: 'slider',
    max: 1.0,
    min: 0.0,
    default: 1.0,
  }],
};
