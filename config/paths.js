const path = require('path');
const fs = require('fs');
const url = require('url');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(path.join(__dirname, '../'));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),

  componentsAlias: resolveApp('src/components'),
  constantsAlias: resolveApp('src/constants'),
  facadesAlias: resolveApp('src/facades'),
  loggingAlias: resolveApp('src/logging'),
  overridesAlias: resolveApp('src/overrides'),
  routinesAlias: resolveApp('src/routines'),
  themeSrc: resolveApp('node_modules/theme-claire/src'),
  designSrc: resolveApp('node_modules/design/sass'),

  dotenv: resolveApp('.env'),
  servedPath: getServedPath(resolveApp('package.json')),
  root: resolveApp('.'),
  devtoolsHtml: resolveApp('./public/devtools.html'),
  devtoolsPanelHtml: resolveApp('./public/devtoolsPanel.html'),
  yarnLockFile: resolveApp('yarn.lock'),
  entries: {
    background: resolveApp('src/background.js'),
    injected: resolveApp('src/injected.js'),
    devtools: resolveApp('src/devtools.js'),
    devtoolsPanel: resolveApp('src/devtoolsPanel.js'),
    contentScript: resolveApp('src/contentScript.js'),
  },
};
