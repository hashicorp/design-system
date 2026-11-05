/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { defineConfig } from 'vite';
import { extensions, ember, classicEmberSupport } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { loadTranslations } from '@ember-intl/vite';

// For scenario testing
const isCompat = Boolean(process.env.ENABLE_COMPAT_BUILD);

export default defineConfig({
  // images the tests render, like `/assets/images/avatar.png`
  publicDir: 'tests/public',
  resolve: {
    // the compat build rewrites v1 addons itself, so it doesn't need this
    alias: isCompat
      ? []
      : [
          // @embroider/util v1 addon packages used by ember-basic-dropdown@8 don't
          // expose a standard package entry for Vite's resolver. Drop this (and
          // the `@embroider/util` devDependency) with power-select@9.
          // Upgrade: https://github.com/hashicorp/design-system/pull/4275
          {
            find: /^@embroider\/util$/,
            replacement: '@embroider/util/addon/index.js',
          },
        ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // same load paths as the SCSS compilation in rollup.config.mjs
        loadPaths: [
          'node_modules/@hashicorp/design-system-tokens/dist/products/css',
        ],
      },
    },
  },
  plugins: [
    ...(isCompat ? [classicEmberSupport()] : []),
    ember(),
    babel({
      babelHelpers: 'inline',
      extensions,
    }),
    loadTranslations(),
  ],
  build: {
    rollupOptions: {
      input: {
        tests: 'tests/index.html',
      },
    },
  },
});
