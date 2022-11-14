import { defineConfig } from 'vite';
import { yaViteBanner } from '../../build/index';
import { resolve } from 'node:path';

export default async function config(options) {
  return defineConfig({
    plugins: [yaViteBanner({
      banner: "#!/usr/bin/env node",
      raw: true,
      entryOnly: true,
      test: /^cli\.(mjs|umd.js)$/
    })],
    build: {
      outDir: resolve(__dirname, `dist`),
      lib: {
        name: 'raw_banner',
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, `cli.js`),
        fileName: 'cli',
      },
    }
  });
}
