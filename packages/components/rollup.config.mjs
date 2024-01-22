import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['**/*.ts', '**/*.js', 'styles/@hashicorp/*.scss']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['**/*.ts', '**/*.js']),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    scss({
      fileName: 'styles/@hashicorp/design-system-components.css',
      includePaths: [
        '../../node_modules/@hashicorp/design-system-tokens/dist/products/css',
        '../../node_modules/@hashicorp/ember-flight-icons/dist/styles',
      ],
    }),

    scss({
      fileName: 'styles/@hashicorp/design-system-power-select-overrides.css',
    }),

    // Addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css', '**/*.scss']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),

    // Copy readme and license files into published package
    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
      ],
    }),
  ],
  external: [
    'dialog-polyfill',
    'dialog-polyfill/dist/dialog-polyfill.css',
    'ember-modifier',
    'prismjs',
  ],
};
