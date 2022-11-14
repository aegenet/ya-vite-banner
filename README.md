# @aegenet/ya-vite-banner

> Yet Another Vite Banner
>
> Like [Banner Plugin for Webpack](https://webpack.js.org/plugins/banner-plugin/), but for Vite.

## With Vite

```js vite.config.js
import { defineConfig } from 'vite';
import { yaViteBanner } from '@aegenet/ya-vite-banner';
import { resolve } from 'node:path';

export default async function config(options) {
  return defineConfig({
    plugins: [yaViteBanner({
      banner: 'WALLBANG!',
      // raw: true
      // entryOnly: true,
      // test: /^cli\.(mjs|umd.js)$/
    })],
    build: {
      outDir: resolve(__dirname, `dist`),
      lib: {
        name: 'simple_banner',
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, `cli.js`),
        fileName: 'cli',
      },
    }
  });
}
```
