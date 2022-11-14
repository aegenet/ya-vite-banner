import { defineConfig } from 'vite';
import { yaViteBanner } from '../../build/index';
import { resolve } from 'node:path';

export default async function config(options) {
  return defineConfig({
    plugins: [yaViteBanner({
      banner: 'WALLBANG!'
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
