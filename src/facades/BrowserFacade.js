import Chrome from './browsers/ChromeImpl';

const BrowserFacade = (function () {
  let browser;
  switch (process.env.EXT_BUILD) {
    // TODO support Firefox
    // case 'FIREFOX':
    //   browser = firefox;
    //   break;
    case 'CHROME':
    default:
      browser = new Chrome();
  }

  return browser;
})();

export default BrowserFacade;
