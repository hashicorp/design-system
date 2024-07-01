'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  rules: {
    'no-html-comments': false,
    'no-trailing-spaces': true,
    'no-negated-condition': false,
    'require-mandatory-role-attributes': false,
    'no-at-ember-render-modifiers': false,
  },
  ignore: ['blueprints/**', 'tests/**'],
};
