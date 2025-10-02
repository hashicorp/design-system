/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import process from 'process';
import path from 'node:path';
import * as sass from 'sass';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

// Custom SCSS compilation plugins for Rollup
function addScssCompilationPlugins(options) {
  return options.map(({ inputFile, outputFile }) => ({
    name: `rollup custom plugin to generate ${outputFile}`,
    generateBundle() {
      try {
        const inputFileFullPath = `src/styles/@hashicorp/${inputFile}`;
        const outputFileFullPath = `styles/@hashicorp/${outputFile}`;

        const result = sass.compile(inputFileFullPath, {
          sourceMap: true,
          loadPaths: ['node_modules/@hashicorp/design-system-tokens/dist'],
        });

        // Emit the compiled CSS
        this.emitFile({
          type: 'asset',
          fileName: outputFileFullPath,
          source: result.css,
        });

        // Emit the source map
        if (result.sourceMap) {
          this.emitFile({
            type: 'asset',
            fileName: `${outputFileFullPath}.map`,
            source: JSON.stringify(result.sourceMap),
          });
        }
      } catch (error) {
        this.error(
          `Failed to compile SCSS file "${inputFile}": ${error.message}`
        );
      }
    },
  }));
}

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

  // We use a custom plugin for the Sass/SCSS compilation
  // so we can have multiple input and multiple outputs
  ...addScssCompilationPlugins([
    {
      inputFile: 'design-system-components.scss',
      outputFile: 'design-system-components.css',
    },
    {
      inputFile: 'design-system-components-theming-with-css-selectors.scss',
      outputFile: 'design-system-components-theming-with-css-selectors.css',
    },
    {
      inputFile:
        'design-system-components-theming-with-prefers-color-scheme.scss',
      outputFile:
        'design-system-components-theming-with-prefers-color-scheme.css',
    },
    {
      inputFile:
        'design-system-components-theming-with-combined-strategies.scss',
      outputFile:
        'design-system-components-theming-with-combined-strategies.css',
    },
    {
      inputFile: 'design-system-power-select-overrides.scss',
      outputFile: 'design-system-power-select-overrides.css',
    },
  ]),

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

  // Copy readme and license files into published package
  copy({
    targets: [
      { src: 'README.md', dest: 'dist' },
      { src: 'LICENSE.md', dest: 'dist' },
    ],
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
  plugins: plugins,
  external: ['ember-modifier', 'prismjs'],
};
