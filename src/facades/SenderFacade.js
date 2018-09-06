import Chrome from './senders/ChromeImpl';

const SenderFacade = (function () {
  let sender;
  switch (process.env.EXT_BUILD) {
    // TODO support Firefox
    // case 'FIREFOX':
    //   sender = firefox;
    //   break;
    case 'CHROME':
    default:
      sender = new Chrome();
  }

  return sender;
})();

export default SenderFacade;
