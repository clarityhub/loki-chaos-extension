export default class Chrome {
  sendToTabs = (type, data) => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          type,
          data,
        });
      });
    });
  }

  sendToTab = (id, type, data) => {
    chrome.tabs.sendMessage(id, {
      type,
      data,
    });
  }
};
