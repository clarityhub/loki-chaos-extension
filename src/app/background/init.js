import logging from 'logging';
import Facades from 'facades';

import setup from './setup';

logging.setup();

export default () => {
  const browser = Facades.Browser;

  browser.onInstalled(setup);
  browser.onUpdate(setup);
};
