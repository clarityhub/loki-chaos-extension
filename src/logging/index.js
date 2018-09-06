import bugsnag from 'bugsnag-js';

let isSetup = false;

export default {
  setup() {
    if (process.env.EXT_BUGSNAG_ID) {
      isSetup = true;

      bugsnag(process.env.EXT_BUGSNAG_ID);
      bugsnag.metaData = {
        app: {
          releaseStage: process.env.EXT_STAGE,
        },
      };
    }
  },

  report(err) {
    if (isSetup) {
      bugsnag.notify(err);
    } else {
      /* eslint-disable-next-line no-console */
      console.error(err);
    }
  },
};
