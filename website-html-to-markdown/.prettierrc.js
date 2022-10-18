'use strict';

module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.md',
      options: {
        singleQuote: false,
        printWidth: 120,
      },
    },
  ],
};
