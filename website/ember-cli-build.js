/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const isVercelProduction = process.env.VERCEL_ENV === 'production';

const appConfig = {
  // Add options here
  sassOptions: {
    precision: 4,
    includePaths: [
      '../node_modules/@hashicorp/design-system-components/dist/styles',
      '../node_modules/@hashicorp/design-system-tokens/dist/products/css',
    ],
  },
  // we need to add this or Ember Sass compilation will mess up the generated CSS
  minifyCSS: {
    options: {
      advanced: false,
    },
  },
  // https://cli.emberjs.com/release/advanced-use/asset-compilation/#fingerprintingandcdnurls
  fingerprint: {
    // override defaults to also include json files which our markdown is compiled to. without this images don't render properly.
    replaceExtensions: ['html', 'css', 'js', 'json'],
    // in the algolia index we want to store the fingerprinted illustrations' paths only in "production"
    exclude: isVercelProduction ? [] : ['assets/illustrations/**'],
  },
  'ember-prism': {
    components: [
      'bash',
      'css',
      'handlebars',
      'javascript',
      'markup-templating',
      'scss',
    ],
    theme: 'dracula',
    plugins: ['line-numbers', 'normalize-whitespace'],
  },
  // https://github.com/shipshapecode/prember-sitemap-generator#usage
  prember: {
    baseRoot: 'https://helios.hashicorp.design/',
  },
};

module.exports = function (defaults) {
  let app = new EmberApp(defaults, appConfig);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
