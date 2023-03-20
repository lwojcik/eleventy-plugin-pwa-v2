# eleventy-plugin-pwa-v2

> An [Eleventy](https://11ty.dev) plugin to generate service worker, **compatible with Eleventy v2.0**.
> Using Google Workbox v6 to generate service-worker.js based on your `dir.output`.

This is an independent fork of [@pkvach/eleventy-plugin-pwa](https://github.com/pkvach/eleventy-plugin-pwa), originally at version 1.4.0.

Compared to previous forks, this plugin relies on [eleventy.after event](https://www.11ty.dev/docs/events/#eleventy.after) rather than monkey-patching the Eleventy installation.

## Demo

Demo repository (Eleventy starter template with the plugin): https://github.com/lwojcik/eleventy-plugin-pwa-v2-demo

Demo site on Netlify: https://eleventy-plugin-pwa-v2-demo.netlify.app/

Demo site on Vercel: https://eleventy-plugin-pwa-v2-demo.vercel.app/

## Getting started

### Installation

```sh
npm install eleventy-plugin-pwa-v2
```

### Setup

Add plugin to your eleventy config file:

```js
const pluginPWA = require("eleventy-plugin-pwa-v2");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA);
};
```

Register a Service Worker in your template:

```html
// in your head section template
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
</script>
```

#### Adding Web App Manifest

See the guide on [How to add a web app manifest](https://web.dev/add-manifest/).

## Options

You can pass Workbox `generateSW` options directly into the plugin:

```js
const pluginPWA = require("eleventy-plugin-pwa-v2");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./build/sw.js",
    globDirectory: "./build",
  });
};
```

All available options are listed on [Workbox generateSW module page](https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-GenerateSWOptions).

## Contributions

Contributions of any kind are welcome.

You can contribute by:

- submiting bug reports
- improving documentation
- submitting pull requests

Before contributing be sure to read [Code of Conduct](https://github.com/lwojcik/eleventy-plugin-pwa-v2/blob/main/CODE_OF_CONDUCT.md).

## License

This code is available under the [MIT license](LICENSE).

## Acknowledgements

- Pavel Kvach: [pkvach](https://github.com/pkvach), [@pkvach/eleventy-plugin-pwa](https://github.com/pkvach/eleventy-plugin-pwa)
- Nanda Oktavera: [okitavera](https://github.com/okitavera), [@okitavera/eleventy-plugin-pwa](https://github.com/okitavera/eleventy-plugin-pwa)
- Mike Riethmuller: [Supermaya](https://github.com/MadeByMike/supermaya)
- Zach Leatherman: [zachleat.com](https://github.com/zachleat/zachleat.com)
