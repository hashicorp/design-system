"use strict";

module.exports = {
  trailingComma: 'es5',
  overrides: [
    {
      files: "*.{js,ts,gjs,gts,mjs,cjs}",
      options: {
        singleQuote: true,
      },
    },
    {
      files: "*.hbs",
      options: {
        printWidth: 120,
      },
    },
  ],
};
