import React from 'react';
import { render } from 'react-dom';
import Panel from 'components/Panel';
import Facades from 'facades';
import routines from 'routines';
import { SETTINGS_KEY } from 'constants/storage';

const onInject = () => {
  const senders = Facades.Senders;
  const browser = Facades.Browser;

  const tabId = browser.getDevToolTabId();

  senders.sendToTab(tabId, 'inject', {});
};

const onInjectOnLoad = async (origin) => {
  const storage = Facades.Storage;

  const settings = await storage.get(SETTINGS_KEY);

  if (settings.autoInject.indexOf(origin) === -1) {
    settings.autoInject.push(origin);
  }

  await storage.set(SETTINGS_KEY, settings);

  return settings;
};

const onRemoveInjectOnLoad = async (origin) => {
  const storage = Facades.Storage;

  const settings = await storage.get(SETTINGS_KEY);

  const index = settings.autoInject.indexOf(origin);

  if (index !== -1) {
    settings.autoInject = [...settings.autoInject.slice(0, index), ...settings.autoInject.slice(index + 1)];
  }

  await storage.set(SETTINGS_KEY, settings);

  return settings;
};

const onFormChanged = async (settings) => {
  const storage = Facades.Storage;

  await storage.set(SETTINGS_KEY, settings);
};

export default async () => {
  const theme = Facades.Theme;
  const storage = Facades.Storage;
  const browser = Facades.Browser;

  console.log(SETTINGS_KEY);

  const settings = await storage.get(SETTINGS_KEY);
  const origin = await browser.getDevToolsTabOrigin();

  console.log(settings);
  // Initialize react app
  render(
    <Panel
      onInject={onInject}
      onInjectOnLoad={onInjectOnLoad}
      onFormChanged={onFormChanged}
      onRemoveInjectOnLoad={onRemoveInjectOnLoad}
      theme={theme.get()}
      routines={routines}
      settings={settings}
      origin={origin}
    />,
    document.getElementById('root')
  );
};
