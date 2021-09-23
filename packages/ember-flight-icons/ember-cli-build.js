'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    fingerprint: {
      exclude: ['flight-icon-sprite'],
    },
    postcssOptions: {
      compile: {
        enabled: true,
        cacheInclude: [/.*\.hbs$/, /.*\.css$/, /.*\.html/],
        plugins: [
          {
            module: require('postcss-import'),
          },
          // eslint-disable-next-line node/no-missing-require
          require('tailwindcss')('./tests/dummy/app/styles/tailwind.config.js'),
        ],
      },
    },
    'ember-prism': {
      theme: 'funky',
      components: ['markup', 'bash'], //needs to be an array, or undefined.
      plugins: ['line-numbers', 'toolbar', 'copy-to-clipboard', 'autoloader'],
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
