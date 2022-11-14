import * as path from 'node:path';
import * as assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

describe('ya-vite-banner', () => {
  it('Without options', async () => {
    try {
      execSync(`npm run build`, {
        cwd: path.join(process.cwd(), 'tests', 'no_options'),
      });
      throw new Error('Must failed.');
    } catch (error) {
      assert.strictEqual((error as { status: number })?.status, 1);
      assert.ok((error as { stderr: Buffer })?.toString().indexOf('Banner Plugin: `options` object is mandatory.') !== -1);
    }
  });

  it('Empty options', async () => {
    try {
      execSync(`npm run build`, {
        cwd: path.join(process.cwd(), 'tests', 'empty_options'),
      });
      throw new Error('Must failed.');
    } catch (error) {
      assert.strictEqual((error as { status: number })?.status, 1);
      assert.ok((error as { stderr: Buffer })?.toString().indexOf('Banner Plugin: `banner` options is mandatory.') !== -1);
    }
  });

  it('Simple banner', async () => {
    const results = execSync(`npm run build`, {
      cwd: path.join(process.cwd(), 'tests', 'simple_banner'),
    });
    
    assert.ok(results.toString().indexOf('1 modules transformed.') !== -1);
    assert.ok(results.toString().indexOf('cli.mjs') !== -1);
    assert.ok(results.toString().indexOf('cli.umd.js') !== -1);
    const fileMjs = await readFile(path.join(process.cwd(), 'tests', 'simple_banner', 'dist', 'cli.mjs'), 'utf-8');
    assert.ok(fileMjs.startsWith('/*! WALLBANG! */'));
    const fileUmd = await readFile(path.join(process.cwd(), 'tests', 'simple_banner', 'dist', 'cli.umd.js'), 'utf-8');
    assert.ok(fileUmd.startsWith('/*! WALLBANG! */'));
  });

  it('Raw banner', async () => {
    const results = execSync(`npm run build`, {
      cwd: path.join(process.cwd(), 'tests', 'raw_banner'),
    });

    assert.ok(results.toString().indexOf('1 modules transformed.') !== -1);
    assert.ok(results.toString().indexOf('cli.mjs') !== -1);
    assert.ok(results.toString().indexOf('cli.umd.js') !== -1);
    const fileMjs = await readFile(path.join(process.cwd(), 'tests', 'raw_banner', 'dist', 'cli.mjs'), 'utf-8');
    assert.ok(fileMjs.startsWith('#!/usr/bin/env node'));
    const fileUmd = await readFile(path.join(process.cwd(), 'tests', 'raw_banner', 'dist', 'cli.umd.js'), 'utf-8');
    assert.ok(fileUmd.startsWith('#!/usr/bin/env node'));
  });
});
