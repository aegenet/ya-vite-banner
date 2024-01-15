[![npm version](https://img.shields.io/npm/v/@aegenet/ya-vite-banner.svg)](https://www.npmjs.com/package/@aegenet/ya-vite-banner)
[![Build Status](https://github.com/aegenet/ya-vite-banner/actions/workflows/ci.yml/badge.svg)](https://github.com/aegenet/ya-vite-banner/actions)
[![codecov](https://codecov.io/gh/aegenet/ya-vite-banner/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/aegenet/ya-vite-banner)
<br />

# @aegenet/ya-vite-banner

> Yet Another Vite Banner
>
> Like [Banner Plugin for Webpack](https://webpack.js.org/plugins/banner-plugin/), but for Vite.

## 💾 Installation

```shell
yarn add @aegenet/ya-vite-banner@^1 -D
# or
npm i @aegenet/ya-vite-banner@^1 --save-dev
```

## 📝 Usage

### With Vite

```js vite.config.js
import { defineConfig } from 'vite';
import { yaViteBanner } from '@aegenet/ya-vite-banner';
import { resolve } from 'node:path';

export default async function config(options) {
  return defineConfig({
    plugins: [yaViteBanner({
      banner: '#!/usr/bin/env node',
      raw: true
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

# Coverage
[![codecov](https://codecov.io/gh/aegenet/ya-vite-banner/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/aegenet/ya-vite-banner)

![Coverage sunburst](https://codecov.io/gh/aegenet/ya-vite-banner/branch/main/graphs/sunburst.svg?token=)

![Coverage tree](https://codecov.io/gh/aegenet/ya-vite-banner/branch/main/graphs/tree.svg?token=)

# License

[The MIT License](LICENSE) - Copyright © 2024 [Alexandre Genet](https://github.com/aegenet).
