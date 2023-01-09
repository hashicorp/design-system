'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      precision: 4,
      includePaths: [
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
    },
    'ember-prism': {
      components: [
        'apacheconf',
        'bash',
        'css',
        'handlebars',
        'http',
        'javascript',
        'json',
        'markup-templating',
        'ruby',
        'scss',
      ],
      theme: 'dracula',
      plugins: ['line-numbers', 'normalize-whitespace'],
    },
  });

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
