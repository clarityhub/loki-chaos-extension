import Promise from 'overrides/promise';

function promiseTimeout(settings) {
  const { chaos } = settings;

  if (!window.Promise || !window.Promise.injected) {
    window.Promise = Promise;
  }

  window.Promise.timeoutRate = chaos;
};

promiseTimeout.title = 'Timeout Promises';
promiseTimeout.description = `Change promises to never reject or resolve.`;
promiseTimeout.controls = [{
  name: 'chaos',
  type: 'slider',
  max: 1.0,
  min: 0.0,
  default: 0.0,
}];

export default promiseTimeout;
