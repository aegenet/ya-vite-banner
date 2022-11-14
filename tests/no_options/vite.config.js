import { defineConfig } from 'vite';
import { yaViteBanner } from '../../build/index';
import { resolve } from 'node:path';

export default async function config(options) {
  return defineConfig({
    plugins: [yaViteBanner()],
    build: {
      outDir: resolve(__dirname, `dist`),
      lib: {
        name: 'no_options',
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, `cli.js`),
        fileName: 'cli',
      },
    }
  });
}
