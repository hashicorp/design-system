'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  trailingComma: 'es5',

  jsdocPrintWidth: 120,

  overrides: [
    {
      files: '*.{ts,mts,cts,js,cjs,mjs}',
      options: {
        singleQuote: true,
        plugins: ['prettier-plugin-jsdoc'],
      },
    },
    {
      files: '*.{gjs,gts}',
      options: {
        plugins: ['prettier-plugin-ember-template-tag'],
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
