'use strict';

module.exports = {
  plugins: [
    'ember-template-lint-plugin-prettier',
    './lib/template-lint-rules/custom-rules',
],
  extends: [
    'recommended',
    'ember-template-lint-plugin-prettier:recommended',
    'custom-rules:recommended',
  ],
  rules: {
    'no-html-comments': false,
    'no-trailing-spaces': true,
  },
  ignore: ['blueprints/**'],
};
