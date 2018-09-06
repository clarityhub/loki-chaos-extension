# Chaos Extension by Clarity Hub

The Chaos Extension is a Google Chrome and Firefox plugin that allows you to check your error handling and text localization for any site, whether it's a SPA or not.

## How It Works

1. Install the extension, it will show up in your toolbar
2. When you are developing, click the extension toolbar button
3. The extension will purposefully start failing Promises, AJAX calls, etc.
4. You can change what to fail and the failure rate in the extension's configuration.

## Future Work

* Fail network requests - since the extension can hook into requests, we can randomly fail asset requests as well (like images)
* Allow users to change the payloads for non-2XX requests.