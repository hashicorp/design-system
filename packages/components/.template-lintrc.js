'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: [
    'recommended',
    'a11y',
    'ember-template-lint-plugin-prettier:recommended',
  ],
  rules: {
    'no-html-comments': false,
    'no-trailing-spaces': true,
  },
};
