/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const isVercelProduction = process.env.VERCEL_ENV === 'production';

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },
    // Add options here
    babel: {
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },
    sassOptions: {
      precision: 4,
      includePaths: [
        'node_modules/@hashicorp/design-system-tokens/dist',
        'node_modules/@hashicorp/design-system-components/dist/styles',
        'node_modules/ember-power-select/vendor',
        'node_modules/ember-a11y-refocus/dist/styles',
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
        'typescript',
      ],
      theme: 'dracula',
      plugins: ['line-numbers', 'normalize-whitespace'],
    },
    // https://github.com/shipshapecode/prember-sitemap-generator#usage
    prember: {
      baseRoot: 'https://helios.hashicorp.design/',
    },
  });

  return app.toTree();
};
