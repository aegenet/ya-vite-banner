import type { OutputBundle, OutputChunk } from 'rollup'

/**
 * Yet Another Banner Plugin
 */
 export function yaViteBanner (
  pluginOptions: {
    banner: string;
    raw?: boolean;
    test?: RegExp;
    entryOnly?: boolean;
  }
) {
  if (!pluginOptions) {
    throw new Error('Banner Plugin: `options` object is mandatory.')
  }
  if (!pluginOptions.banner?.length) {
    throw new Error('Banner Plugin: `banner` options is mandatory.')
  }
  pluginOptions.raw ??= false;
  pluginOptions.entryOnly ??= false;

  // Handle files
  return {
    name: 'ya-banner-plugin',
    generateBundle(options: unknown, bundles: OutputBundle, isWrite: boolean) {
      const { banner, raw, test, entryOnly } = pluginOptions;

      for (const [fileName, bundle] of Object.entries(bundles)) {
        if ((!entryOnly || (bundle as OutputChunk).isEntry) && (!test || test.test(fileName))) {
          (bundle as OutputChunk).code = raw ? `${banner}\n${(bundle as OutputChunk).code}` : `/*! ${banner} */\n${(bundle as OutputChunk).code}`;
        }
      }
    },
  }
}
