/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');
const { Webpack } = require('@embroider/webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: [
        '@hashicorp/design-system-components',
        '@hashicorp/ember-flight-icons',
      ],
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
    // See https://github.com/adopted-ember-addons/ember-cli-sass
    sassOptions: {
      precision: 4,
      includePaths: [
        '../node_modules/@hashicorp/design-system-components/dist/styles',
        // '../node_modules/@hashicorp/ember-flight-icons/dist/styles',
        '../node_modules/@hashicorp/design-system-tokens/dist/products/css',
        '../node_modules/ember-power-select/vendor',
      ],
    },
    'ember-power-select': {
      theme: false,
    },
    // we need to add this or Ember Sass compilation will mess up the generated CSS
    minifyCSS: {
      options: {
        advanced: false,
      },
    },
  });

  return compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticModifiers: true,
    // staticHelpers: true,
    // staticComponents: true,
    // staticEmberSource: true,
    splitControllers: true,
    splitRouteClasses: true,
    // splitAtRoutes: ['route.name'], // can also be a RegExp
    packagerOptions: {
      webpackConfig: {},
    },
  });
};
