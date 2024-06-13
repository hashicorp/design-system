"use strict";

module.exports = {
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
