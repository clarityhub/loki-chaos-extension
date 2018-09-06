import Chrome from './listeners/ChromeImpl';

const ListenerFacade = (function () {
  let listener;
  switch (process.env.EXT_BUILD) {
    // TODO support Firefox
    // case 'FIREFOX':
    //   listener = firefox;
    //   break;
    case 'CHROME':
    default:
      listener = new Chrome();
  }

  return listener;
})();

export default ListenerFacade;
