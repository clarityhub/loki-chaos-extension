export const DEFAULT_SETTINGS = {
  version: '1.1.0',
  autoInject: [],
  routines: {
    'fetch.fail': {
      chaos: 0.0,
    },

    localization: {
      on: false,
    },

    'promise.throw': {
      chaos: 1.0,
    },

    'promise.timeout': {
      chaos: 0.1,
    },
  },
};
