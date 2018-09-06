import Chrome from './storage/ChromeImpl';

const StorageFacade = (function () {
  let storage;
  switch (process.env.EXT_BUILD) {
    // TODO support Firefox
    // case 'FIREFOX':
    //   storage = firefox;
    //   break;
    case 'CHROME':
    default:
      storage = new Chrome();
  }

  return storage;
})();

export default StorageFacade;
