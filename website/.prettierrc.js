'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  templateSingleQuote: false,
  overrides: [
    {
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
    {
      files: '*.hbs',
      options: {
        printWidth: 120,
      },
    },
  ],
};
