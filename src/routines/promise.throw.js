import Promise from 'overrides/promise';

function promiseThrow(settings) {
  const { chaos } = settings;

  if (!window.Promise || !window.Promise.injected) {
    window.Promise = Promise;
  }

  window.Promise.failRate = chaos;
};

promiseThrow.title = 'Reject Promises';
promiseThrow.description = `Change promises to reject instead of resolve.`;
promiseThrow.controls = [{
  name: 'chaos',
  type: 'slider',
  max: 1.0,
  min: 0.0,
  default: 1.0,
}];

export default promiseThrow;
