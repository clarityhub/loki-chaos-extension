export default class Chrome {
    listen = (type, cb) => {
      chrome.runtime.onMessage.addListener((request) => {
        if (request.type === type) {
          cb(request);
        }
      });
    }
};
