export default class Chrome {
  onInstalled = (cb) => {
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        cb();
      }
    });
  }

  onUpdate = (cb) => {
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'update') {
        cb();
      }
    });
  }

  onToolbarClicked = (cb) => {
    chrome.browserAction.onClicked.addListener(cb);
  }

  getScriptUrl = (key) => {
    return chrome.runtime.getURL(key);
  }

  createWindow = (url, options) => {
    chrome.tabs.create({
      url,
      active: false,
    }, (tab) => {
      chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true,
        ...options,
      });
    });
  }

  createDevToolPanel = (...args) => {
    chrome.devtools.panels.create(...args);
  }

  getDevToolTabId = () => {
    return chrome.devtools.inspectedWindow.tabId;
  }

  getDevToolsTabOrigin = async () => {
    const origin = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(
        'window.location.origin',
        function (origin) {
          resolve(origin);
        }
      );
    });

    return origin;
  }
};
