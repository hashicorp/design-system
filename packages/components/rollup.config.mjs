import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { Addon } from '@embroider/addon-dev/rollup';
import typescript from 'rollup-plugin-ts';
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
    nodeResolve(),
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints([
      '**/*.ts',
      '**/*.js',
      'styles/@hashicorp/design-system-components.scss',
      'styles/@hashicorp/design-system-power-select-overrides.scss',
    ]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['**/*.ts', '**/*.js']),

    scss({
      fileName: 'styles/@hashicorp/design-system-components.css',
      outputStyle: 'compressed',
      includePaths: [
        '../../node_modules/@hashicorp/design-system-tokens/dist/products/css',
      ],
    }),

    scss({
      fileName: 'styles/@hashicorp/design-system-power-select-overrides.css',
      outputStyle: 'compressed',
      includePaths: [
        '../../node_modules/@hashicorp/design-system-tokens/dist/products/css',
      ],
    }),

    typescript({
      transpiler: 'babel',
      browserslist: false,
      transpileOnly: false,
    }),

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

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css', '**/*.scss']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
  external: ['dialog-polyfill-css', 'ember-modifier', 'prismjs'],
};
