/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    // See https://cli.emberjs.com/release/advanced-use/asset-compilation/#configuringoutputpaths
    // Notice: this triggers the warning "Using the `outputPaths` build option is deprecated, as output paths will no longer be predetermined under Embroider."
    // but I was not able to find online documentation or help about what one is supposed to do in alternative
    // outputPaths: {
    //   app: {
    //     css: {
    //       app: '/assets/showcase.css',
    //       'showcase-theming/dark': '/assets/showcase-theme-dark.css',
    //       'showcase-theming/light': '/assets/showcase-theme-light.css',
    //     },
    //   },
    // },

    // See https://github.com/adopted-ember-addons/ember-cli-sass
    sassOptions: {
      precision: 4,
      includePaths: [
        '../node_modules/@hashicorp/design-system-tokens/dist/products/css',
        '../node_modules/@hashicorp/design-system-components/dist/styles',
        '../node_modules/ember-power-select/vendor',
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
    ],
  });
};
