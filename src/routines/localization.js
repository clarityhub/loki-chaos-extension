import mutate from 'overrides/text/mutate';

const config = {
  characterData: true,
  childList: true,
  subtree: true,
};

/* eslint-disable */
function textNodesUnder(el) {
  var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) a.push(n);
  return a;
}
/* eslint-enable */

const doMutation = (textNode) => {
  const visited = textNode['chce-visited'] === textNode.textContent;
  const empty = !textNode.textContent.trim();

  if (!visited && !empty) {
    const nextContent = mutate(textNode.textContent);
    textNode['chce-visited'] = nextContent;
    textNode.textContent = nextContent;
  }
};

function localization(settings) {
  const { on } = settings;

  const callback = (mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'characterData') {
        doMutation(mutation.target);
      }

      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length > 0) {
          Array.from(mutation.addedNodes).forEach(node => {
            const textNodes = textNodesUnder(node);

            textNodes.forEach(textNode => {
              doMutation(textNode);
            });
          });
        }
      }
    });
  };

  if (on) {
    const doListen = () => {
      const observer = new MutationObserver(callback);
      observer.observe(document.getElementsByTagName('body')[0], config);

      const textNodes = textNodesUnder(document.getElementsByTagName('body')[0]);

      textNodes.forEach(textNode => {
        doMutation(textNode);
      });
    };

    if (document.getElementsByTagName('body')[0]) {
      doListen();
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        doListen();
      });
    }
  }
}

localization.title = 'Psuedo-Localization';
localization.description = `Mutate text to expand or contain glyphs`;
localization.controls = [{
  name: 'on',
  type: 'checkbox',
  default: false,
}];

export default localization;
