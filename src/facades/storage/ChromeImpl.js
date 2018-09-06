export default class Chrome {
    get = (key) => {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          if (!result || typeof result[key] === 'undefined') {
            resolve(null);
          }

          resolve(result[key]);
        });
      });
    }

    set = (key, value) => {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => {
          resolve();
        });
      });
    }
}
