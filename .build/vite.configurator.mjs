// vite.config.js
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { nodeExternals } from '@aegenet/ya-node-externals';
// TSC already done
import { yaViteBanner } from '../build/index';

export default async function config(options) {
  const folder = options.folder ? options.folder + '/' : '';

  return defineConfig({
    build: {
      plugins: [
        yaViteBanner({
          banner: "#!/usr/bin/env node",
          raw: true,
          entryOnly: true,
          test: /^cli\.(js|ts)$/
        })
      ],
      outDir: `./dist/${folder}`,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(options.cwd, `build/${options.entryPoint || 'index.js'}`),
        name: options.libName,
        fileName: 'index',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: options.nodeExternal ? (await nodeExternals(options.cwd)).concat([/^node:/]).concat(options.external || []) : options.external || [],
        output: [
          {
            name: options.libName,
            format: 'cjs',
            entryFileNames: `index.cjs`,
            globals: options.globals || {},
          },
          {
            name: options.libName,
            format: 'es',
            entryFileNames: `index.mjs`,
            globals: options.globals || {},
          },
          {
            name: options.libName,
            format: 'umd',
            entryFileNames: `index.[format].js`,
            globals: options.globals || {},
          },
        ],
      },
    },
  });  
}
