import Facades from 'facades';

export default () => {
  const browser = Facades.Browser;

  // TODO panel icon
  browser.createDevToolPanel('Chaos', 'PanelIcon.png', 'devtoolsPanel.html');
};
