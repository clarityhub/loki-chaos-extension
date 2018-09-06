export const DEFAULT_SETTINGS = {
  version: '1.0.1',
  autoInject: [],
  routines: {
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
