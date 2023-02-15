# eleventy-plugin-pwa-v2

> An [Eleventy](https://11ty.io) plugin to generate service worker, **compatible with Eleventy v2.0**.
> Using Google Workbox to generate service-worker.js based on your `dir.output`.

This is an independent fork of [@pkvach/eleventy-plugin-pwa](https://github.com/pkvach/eleventy-plugin-pwa), originally at version 1.4.0.

Compared to previous forks, this plugin relies on [eleventy.after event](https://www.11ty.dev/docs/events/#eleventy.after) rather than monkey-patching the Eleventy installation.

## Getting started

### Installation

```sh
npm install eleventy-plugin-pwa-v2
```

### Usage

#### Add to eleventy config file

```js
const pluginPWA = require("eleventy-plugin-pwa-v2");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA);
};
```

Read more about [Eleventy plugins](https://www.11ty.io/docs/plugins/)

#### Registering Service Worker

```html
// in your header templates
<script>
  if ("serviceWorker" in navigator)
    navigator.serviceWorker.register("/service-worker.js");
</script>
```

#### Adding Web App Manifest

Read [The Web App Manifest Guide](https://developers.google.com/web/fundamentals/web-app-manifest/)

## Options

You can also pass workbox generateSW options directly into the plugin.
For example :

```js
// overwriting destination file and more
const pluginPWA = require("eleventy-plugin-pwa-v2");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./build/sw.js",
    globDirectory: "./build",
  });
};
```

Read more about it on [workbox generateSW module page](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config).

## Contributions

Contributions of any kind are welcome.

You can contribute by:

- submiting bug reports
- improving documentation
- submitting pull requests

Before contributing be sure to read [Code of Conduct](https://github.com/eleventy-plugin-pwa-v2/blob/main/CODE_OF_CONDUCT.md).

## License

This code is available under the [MIT license](LICENSE).

## Acknowledgements

- Pavel Kvach: [pkvach](https://github.com/pkvach), [@pkvach/eleventy-plugin-pwa](https://github.com/pkvach/eleventy-plugin-pwa)
- Nanda Oktavera: [okitavera](https://github.com/okitavera), [@okitavera/eleventy-plugin-pwa](https://github.com/okitavera/eleventy-plugin-pwa)
- Mike Riethmuller: [Supermaya](https://github.com/MadeByMike/supermaya)
- Zach Leatherman: [zachleat.com](https://github.com/zachleat/zachleat.com)
