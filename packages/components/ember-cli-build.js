'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // See https://github.com/adopted-ember-addons/ember-cli-sass
    sassOptions: {
      precision: 4,
      includePaths: [
        '../../node_modules/@hashicorp/design-system-tokens/dist/products/css',
        '../../node_modules/ember-power-select/vendor',
      ],
    },
    'ember-power-select': {
      theme: false,
    },
    'ember-prism': {
      components: ['markup', 'bash', 'markup-templating', 'handlebars'], //needs to be an array, or undefined.
      plugins: ['line-numbers', 'toolbar', 'copy-to-clipboard', 'autoloader'],
      theme: 'none',
    },
  });

  app.import('app/styles/prism-dracula.css');
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
