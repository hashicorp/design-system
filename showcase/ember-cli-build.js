/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const fs = require('fs');
const path = require('path');

const componentsSrcStylesFolder =
  'node_modules/@hashicorp/design-system-components/src/styles';
const componentsDistStylesFolder =
  'node_modules/@hashicorp/design-system-components/dist/styles';

// check if `src/styles` exists (only available in local dev via pnpm workspace symlink)
const componentsSrcStylesPath = path.resolve(
  __dirname,
  componentsSrcStylesFolder,
);
const hasSrcStyles = fs.existsSync(componentsSrcStylesPath);

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    // See https://github.com/adopted-ember-addons/ember-cli-sass
    sassOptions: {
      precision: 4,
      includePaths: [
        'node_modules/@hashicorp/design-system-tokens/dist/products/css',
        // use `src/styles` for hot reload in local dev, fall back to `dist/styles` in CI/tests
        ...(hasSrcStyles
          ? [componentsSrcStylesFolder]
          : [componentsDistStylesFolder]),
        'node_modules/ember-power-select/vendor',
      ],
    },
    // we need to add this or Ember Sass compilation will mess up the generated CSS
    minifyCSS: {
      options: {
        advanced: false,
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
      {
        package: '@hashicorp/flight-icons',
      },
    ],
  });
};
