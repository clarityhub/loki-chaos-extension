import Chrome from './themes/ChromeImpl';

const ThemeFacade = (function () {
  let theme;
  switch (process.env.EXT_BUILD) {
    // TODO support Firefox
    // case 'FIREFOX':
    //   theme = firefox;
    //   break;
    case 'CHROME':
    default:
      theme = new Chrome();
  }

  return theme;
})();

export default ThemeFacade;
