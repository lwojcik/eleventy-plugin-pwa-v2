# eleventy-plugin-pwa-v2

> An [Eleventy](https://11ty.dev) plugin to generate service worker, **compatible with Eleventy v2.0**.
> Using Google Workbox v6 to generate service-worker.js based on your `dir.output`.

This is an independent fork of [@pkvach/eleventy-plugin-pwa](https://github.com/pkvach/eleventy-plugin-pwa), originally at version 1.4.0.

Compared to previous forks, this plugin relies on [eleventy.after event](https://www.11ty.dev/docs/events/#eleventy.after) rather than monkey-patching the Eleventy installation.

## Getting started

### Installation

```sh
npm install eleventy-plugin-pwa-v2
```

### Setup

- **Add plugin to your eleventy config file:**

```js
const pluginPWA = require("eleventy-plugin-pwa-v2");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA, {
    cacheId: "your-app-id", // change this to your application id
    globIgnores: [
      // any files you don't want service worker to cache go here
      "share-*.jpg",
    ],
    runtimeCaching: [
      {
        // we always want fresh copy of the index page
        urlPattern: /\/$/,
        handler: "NetworkFirst",
      },
      {
        // we also want fresh copies of any HTML page
        urlPattern: /\.html$/,
        handler: "NetworkFirst",
      },
      {
        // we serve stale copies of static assets while they're refreshed
        urlPattern:
          /^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
        handler: "StaleWhileRevalidate",
      },
    ],
  });
};
```

[Read more on Workbox cache strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/).

- **Register a Service Worker in your template**

In the scenario below, your site will refresh automatically when new service worker is installed. However, you may want to implement an UI element to prompt user to refresh the page (e.g. a button labelled _Update available. Refresh?_ that triggers `window.location.reload()` on click).

```html
// in your head section template
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New service worker installed and registered, we reload the page
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
</script>
```

- **Add web application manifest**

The fastest way to get a working application manifest is using [Eleventy Favicon Generation plugin](https://www.npmjs.com/package/eleventy-plugin-gen-favicons).

If you want to build the manifest manually, see the guide on [How to add a web app manifest](https://web.dev/add-manifest/).

### Uninstalling the plugin

Please note that when a service worker is installed, and you decide to remove the plugin, the service worker will still remain on your visitor's device.

To ensure that the service worker is unregistered on the user's device during their next visit, add the following code to your site:

```js
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
        registration.unregister();
    }
  });
}
</script>
```

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

## Acknowledgements

- Pavel Kvach: [pkvach](https://github.com/pkvach), [@pkvach/eleventy-plugin-pwa](https://github.com/pkvach/eleventy-plugin-pwa)
- Nanda Oktavera: [okitavera](https://github.com/okitavera), [@okitavera/eleventy-plugin-pwa](https://github.com/okitavera/eleventy-plugin-pwa)
- Mike Riethmuller: [Supermaya](https://github.com/MadeByMike/supermaya)
- Zach Leatherman: [zachleat.com](https://github.com/zachleat/zachleat.com)
