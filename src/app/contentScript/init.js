import Facades from 'facades';
import { SETTINGS_KEY } from 'constants/storage';

import injectScript from './injectScript';
import sendSettings from './sendSettings';

/**
 * Auto-inject if the user has added this location to the auto-inject list.
 *
 * Listen for an inject event as well.
 */
export default async () => {
  const browser = Facades.Browser;
  const storage = Facades.Storage;
  const listeners = Facades.Listeners;

  const url = browser.getScriptUrl('injected.js');

  injectScript(url);

  const settings = await storage.get(SETTINGS_KEY);
  const shouldAutoInject = settings.autoInject.indexOf(window.location.origin) !== -1;

  if (shouldAutoInject) {
    sendSettings(settings);
  } else {
    sendSettings({});
  }

  listeners.listen('inject', async () => {
    const settings = await storage.get(SETTINGS_KEY);
    sendSettings(settings);
  });
};
