'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  templateSingleQuote: false,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.{js,ts,gjs,gts}',
      options: {
        singleQuote: true,
      },
    },
    {
      files: '*.hbs',
      options: {
        singleQuote: false,
        printWidth: 120,
      },
    },
  ],
};
