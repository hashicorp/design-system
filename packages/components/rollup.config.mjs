/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import process from 'process';
import path from 'node:path';

import { buildStylesPlugin } from './scripts/rollup-plugin-build-styles.mjs';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

const STYLE_ENTRIES = [
  '@hashicorp/design-system-components.scss',
  '@hashicorp/design-system-components-common.scss',
  '@hashicorp/design-system-power-select-overrides.scss',
];

const plugins = [
  // These are the modules that users should be able to import from your
  // addon. Anything not listed here may get optimized away.
  addon.publicEntrypoints(['**/*.{js,ts}', 'index.js', 'template-registry.js']),

  // These are the modules that should get reexported into the traditional
  // "app" tree. Things in here should also be in publicEntrypoints above, but
  // not everything in publicEntrypoints necessarily needs to go here.
  addon.appReexports(
    [
      'components/**/!(*types).js',
      'helpers/**/*.js',
      'modifiers/**/*.js',
      'services/**/!(*types).js',
      'instance-initializers/**/*.js',
    ],
    {
      mapFilename: (filename) => {
        if (filename.endsWith('/index.js')) {
          return path.dirname(filename) + '.js';
        }
      },
    }
  ),

  // Follow the V2 Addon rules about dependencies. Your code can import from
  // `dependencies` and `peerDependencies` as well as standard Ember-provided
  // package names.
  addon.dependencies(),

  // Ensure that standalone .hbs files are properly integrated as Javascript.
  addon.hbs(),

  // Ensure that .gjs files are properly integrated as Javascript
  addon.gjs(),

  // Emit .d.ts declaration files
  addon.declarations('declarations'),

  // This babel config should *not* apply presets or compile away ES modules.
  // It exists only to provide development niceties for you, like automatic
  // template colocation.
  //
  // By default, this will load the actual babel config from the file
  // babel.config.json.
  babel({
    extensions: ['.js', '.gjs', '.ts', '.gts'],
    babelHelpers: 'bundled',
  }),

  // Addons are allowed to contain imports of .css files, which we want rollup
  // to leave alone and keep in the published output.
  addon.keepAssets(['**/*.css', '**/*.scss']),

  copy({
    targets: [
      // Copy readme and license files into published package
      { src: 'README.md', dest: 'dist' },
      { src: 'LICENSE.md', dest: 'dist' },
      // Copy the IBM Plex fonts from the @ibm packages to the public folder
      {
        src: 'node_modules/@ibm/plex-sans/LICENSE.txt',
        dest: 'dist/public/assets/fonts',
      },
      {
        src: [
          'node_modules/@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-Italic.woff2',
          'node_modules/@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2',
          'node_modules/@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-SemiBold.woff2',
          'node_modules/@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-SemiBoldItalic.woff2',
          'node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Italic.woff2',
          'node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2',
          'node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-SemiBold.woff2',
          'node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-SemiBoldItalic.woff2',
        ],
        dest: 'dist/public/assets/fonts/complete/woff2',
      },
      {
        src: [
          'node_modules/@ibm/plex-sans/fonts/split/woff2/IBMPlexSans-Regular-*.woff2',
          'node_modules/@ibm/plex-sans/fonts/split/woff2/IBMPlexSans-Italic-*.woff2',
          'node_modules/@ibm/plex-sans/fonts/split/woff2/IBMPlexSans-SemiBold-*.woff2',
          'node_modules/@ibm/plex-sans/fonts/split/woff2/IBMPlexSans-SemiBoldItalic-*.woff2',
          'node_modules/@ibm/plex-mono/fonts/split/woff2/IBMPlexMono-Regular-*.woff2',
          'node_modules/@ibm/plex-mono/fonts/split/woff2/IBMPlexMono-Italic-*.woff2',
          'node_modules/@ibm/plex-mono/fonts/split/woff2/IBMPlexMono-SemiBold-*.woff2',
          'node_modules/@ibm/plex-mono/fonts/split/woff2/IBMPlexMono-SemiBoldItalic-*.woff2',
        ],
        dest: 'dist/public/assets/fonts/split/woff2',
      },
    ],
    hook: 'writeBundle',
    copySync: true,
    copyOnce: true,
    // verbose: true,
  }),

  // Compile SCSS entrypoints -> CSS alongside the copied SCSS in dist/styles/**
  buildStylesPlugin({
    srcRoot: 'src/styles',
    distRoot: 'dist/styles',
    entries: STYLE_ENTRIES,
    includePathsByEntry: {
      '@hashicorp/design-system-components.scss': [
        'node_modules/@hashicorp/design-system-tokens/dist',
      ],
      '@hashicorp/design-system-components-common.scss': [
        'node_modules/@hashicorp/design-system-tokens/dist',
      ],
    },
  }),
];

if (!process.env.development) {
  // Remove leftover build artifacts when starting a new build.
  plugins.push(addon.clean());
}

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),
  plugins,
  external: ['ember-modifier', 'prismjs'],
};
