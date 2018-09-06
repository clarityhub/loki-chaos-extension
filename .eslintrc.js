module.exports = {
  "extends": ["clarity-hub/preact", "./lints/chrome.json"],

  "root": true,

  "rules": {
    "standard/no-callback-literal": false,
  },

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.config.dev.js"
      },
      "node": {
        "paths": ["src"]
      }
    }
  }
};
