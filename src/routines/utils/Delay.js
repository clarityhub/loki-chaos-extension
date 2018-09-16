import UnmodifiedPromise from 'overrides/promise/UnmodifiedPromise';

export default class Delay {
  constructor() {
    this.cachedSettings = null;
    this.ready = false;
    this.waiting = [];
  }

  whenReady = (cb) => {
    return new UnmodifiedPromise((resolve) => {
      if (this.ready) {
        resolve(cb(this.cachedSettings));
      } else {
        this.waiting.push((settings) => {
          resolve(cb(settings));
        });
      }
    });
  }

  invokeReady = (settings) => {
    this.cachedSettings = settings;
    this.ready = true;

    this.waiting.forEach(cb => cb(this.cachedSettings));

    this.waiting = [];
  }
}
