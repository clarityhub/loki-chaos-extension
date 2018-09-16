import get from 'lodash.get';

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

function localization(settings$) {
  let observer;

  settings$.take((settings) => {
    // Clear old
    if (observer) {
      observer.disconnect();
    }

    const on = get(settings, 'routines.localization.on', false);

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
        observer = new MutationObserver(callback);
        observer.observe(document.getElementsByTagName('body')[0], config);

        const textNodes = textNodesUnder(document.getElementsByTagName('body')[0]);

        textNodes.forEach(textNode => {
          doMutation(textNode);
        });
      };

      if (document.getElementsByTagName('body')[0]) {
        doListen();
      } else {
        window.addEventListener('DOMContentLoaded', doListen);
      }
    }
  });
}

export default {
  invoke: localization,
  title: 'Psuedo-Localization',
  description: 'Mutate text to expand or contain glyphs',
  controls: [{
    name: 'on',
    type: 'checkbox',
    default: false,
  }],
};
