import Facades from 'facades';
import { DEFAULT_SETTINGS } from 'constants/settings';
import { SETTINGS_KEY } from 'constants/storage';

export default async () => {
  const storage = Facades.Storage;

  let settings = await storage.get(SETTINGS_KEY);

  const isWrongVersion = settings && settings.version !== DEFAULT_SETTINGS.version;

  if (!settings || isWrongVersion) {
    await storage.set(SETTINGS_KEY, DEFAULT_SETTINGS);
  }
};
