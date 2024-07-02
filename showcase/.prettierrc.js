'use strict';

module.exports = {
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.{js,ts}',
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
