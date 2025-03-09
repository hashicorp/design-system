'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
    {
      files: '*.{hbs,scss}',
      options: {
        printWidth: 120,
      },
    },
  ],
};
