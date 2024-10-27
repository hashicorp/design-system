/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');
const { Webpack } = require('@embroider/webpack');
const sideWatch = require('@embroider/broccoli-side-watch');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', { watching: ['../packages'] }),
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    // See https://github.com/adopted-ember-addons/ember-cli-sass
    sassOptions: {
      precision: 4,
      includePaths: [
        'node_modules/@hashicorp/design-system-tokens/dist/products/css',
        'node_modules/@hashicorp/design-system-components/dist/styles',
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

  return compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticModifiers: true,
    staticHelpers: true,
    staticComponents: true,
    staticEmberSource: true,
    splitControllers: true,
    splitRouteClasses: true,
    splitAtRoutes: ['components', 'layouts', 'utilities', 'overrides'], // can also be a RegExp
    skipBabel: [
      {
        package: 'qunit',
      },
      {
        package: 'sinon',
      },
      {
        package: 'axe-core',
      },
      {
        package: '@faker-js/faker',
      },
      {
        package: '@hashicorp/flight-icons',
      },
    ],
    packagerOptions: {
      webpackConfig: {
        entry: {
          sinon: 'sinon',
        },
        optimization: {
          realContentHash: true,
          moduleIds: 'deterministic',
        },
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
          ],
        },
      },
    },
  });
};
